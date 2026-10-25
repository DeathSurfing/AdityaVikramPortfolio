// portfolio-watchtower: poll origin/<branch> and rebuild the v2 stack
// from source when it moves. No registry is involved.
//
// Needs: the checkout mounted at the same absolute path it has on the
// host (WATCHTOWER_REPO_DIR), and the rootful Podman socket at
// /run/podman/podman.sock. Runs `podman compose up -d --build` in
// <repo>/v2, then waits for the health URL before recording the SHA.
//
// Security: the socket is root-equivalent on the host. Only run this
// against a repository you trust.
import { $ } from "bun";

function must(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`missing required env ${name}`);
  return v;
}

const REPO_DIR = must("WATCHTOWER_REPO_DIR");
const BRANCH = process.env.WATCHTOWER_BRANCH ?? "main";
const INTERVAL_MS = Number(process.env.WATCHTOWER_INTERVAL_SEC ?? "60") * 1000;
const HEALTH_URL = process.env.WATCHTOWER_HEALTH_URL ?? "http://localhost:3000/";
const STATE_FILE = `${process.env.WATCHTOWER_STATE_DIR ?? "/state"}/last-sha`;
const COMPOSE_DIR = `${REPO_DIR}/v2`;

const BUILD_TIMEOUT_MS = 30 * 60_000;
const HEALTH_TIMEOUT_MS = 3 * 60_000;

function log(level: string, msg: string, extra: Record<string, string> = {}) {
  console.log(JSON.stringify({ ts: new Date().toISOString(), level, msg, ...extra }));
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function git(...args: string[]) {
  const p = await $`git ${args}`.cwd(REPO_DIR).quiet().nothrow();
  return { code: p.exitCode, out: p.stdout.toString().trim(), err: p.stderr.toString().trim() };
}

async function localHead(): Promise<string> {
  return (await git("rev-parse", "HEAD")).out;
}

async function remoteHead(): Promise<string> {
  const r = await git("ls-remote", "origin", BRANCH);
  if (r.code !== 0) {
    log("warn", "ls-remote failed", { err: r.err.slice(0, 300) });
    return "";
  }
  return r.out.split("\t")[0] ?? "";
}

async function readState(): Promise<string> {
  try {
    return (await Bun.file(STATE_FILE).text()).trim();
  } catch {
    return "";
  }
}

async function writeState(sha: string) {
  await Bun.write(STATE_FILE, `${sha}\n`);
}

// Resolve the compose provider once: `podman compose` when the plugin (or
// shim) exists, otherwise the standalone `podman-compose` binary.
let composeArgv = ["podman", "compose"];

async function detectCompose() {
  const p = await $`podman compose version`.cwd(COMPOSE_DIR).quiet().nothrow();
  composeArgv = p.exitCode === 0 ? ["podman", "compose"] : ["podman-compose"];
  log("info", "compose provider", { argv: composeArgv.join(" ") });
}

async function healthy(): Promise<boolean> {
  const deadline = Date.now() + HEALTH_TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(HEALTH_URL, { signal: AbortSignal.timeout(5000) });
      if (res.ok) return true;
    } catch {
      // Not up yet; keep waiting.
    }
    await sleep(5000);
  }
  return false;
}

async function deploy(remote: string): Promise<boolean> {
  const dirty = (await git("status", "--porcelain")).out;
  if (dirty) {
    log("warn", "tree dirty, skipping update");
    return false;
  }
  const fetched = await git("fetch", "origin", BRANCH);
  if (fetched.code !== 0) {
    log("warn", "fetch failed", { err: fetched.err.slice(0, 300) });
    return false;
  }
  const reset = await git("reset", "--hard", "FETCH_HEAD");
  if (reset.code !== 0) {
    log("error", "reset failed", { err: reset.err.slice(0, 300) });
    return false;
  }
  log("info", "rebuilding from source", {});
  let built = false;
  try {
    const p = await $`${composeArgv} up -d --build`
      .cwd(COMPOSE_DIR)
      .timeout(BUILD_TIMEOUT_MS)
      .quiet()
      .nothrow();
    built = p.exitCode === 0;
    if (!built) log("error", "build failed", { err: p.stderr.toString().slice(-2000) });
  } catch (e) {
    log("error", "build timed out or crashed", { err: String(e).slice(0, 300) });
  }
  if (!built) return false;
  if (!(await healthy())) {
    log("error", "unhealthy after rebuild", { url: HEALTH_URL });
    return false;
  }
  await writeState(remote);
  log("info", "deployed", { sha: remote.slice(0, 12) });
  return true;
}

async function main() {
  await $`git config --global --add safe.directory ${REPO_DIR}`.quiet().nothrow();
  await detectCompose();
  log("info", "watching", { repo: REPO_DIR, branch: BRANCH });
  let last = await readState();
  if (!last) {
    last = await localHead();
    await writeState(last);
    log("info", "state initialized", { sha: last.slice(0, 12) });
  }
  for (;;) {
    await sleep(INTERVAL_MS);
    try {
      const remote = await remoteHead();
      if (!remote || remote === last) continue;
      log("info", "update found", { from: last.slice(0, 12), to: remote.slice(0, 12) });
      if (await deploy(remote)) last = remote;
    } catch (e) {
      log("error", "loop failed", { err: String(e).slice(0, 300) });
    }
  }
}

await main();
