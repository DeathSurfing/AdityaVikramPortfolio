import { NextResponse } from 'next/server';

const WINDOW_MS = 30_000;
const MAX_REQUESTS = 10;

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  entry.count++;
  return entry.count <= MAX_REQUESTS;
}

export async function GET(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const username = process.env.GITHUB_USERNAME || 'deathSurfing';
  const res = await fetch(
    `https://github-contributions.vercel.app/api/v1/${username}`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) return NextResponse.json({ error: 'not found' }, { status: 404 });
  const data = await res.json();
  return NextResponse.json(data);
}
