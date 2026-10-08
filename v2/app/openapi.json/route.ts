import { apiEndpoints, apiTags, apiBaseUrl } from "@/data/api"
import { profile } from "@/data/profile"

export const dynamic = "force-static"

// OpenAPI 3.1 document for the read-only JSON API. Generated from
// data/api.ts, so adding an endpoint there updates the spec, the API catalog,
// and the homepage Link headers together.
//
// pruned: response schemas. The payloads are documents rather than typed
// resources, and a wrong schema is worse than no schema, so responses are
// described but not constrained. Add them if a client ever generates from
// this document and needs the types.
export function GET() {
  const paths: Record<string, Record<string, unknown>> = {}

  for (const endpoint of apiEndpoints) {
    const parameters = [
      ...(endpoint.pathParams ?? []).map((param) => ({
        name: param.name,
        in: "path",
        required: true,
        description: param.description,
        schema: { type: "string" },
      })),
      ...(endpoint.params ?? []).map((param) => ({
        name: param.name,
        in: "query",
        required: param.required ?? false,
        description: param.description,
        schema: { type: param.type },
      })),
    ]

    paths[endpoint.path] = {
      [endpoint.method]: {
        summary: endpoint.summary,
        description: endpoint.description,
        tags: [endpoint.tag],
        ...(parameters.length > 0 ? { parameters } : {}),
        responses: {
          "200": {
            description: "Successful response as JSON.",
            content: {
              "application/json": {
                schema: { type: "object" },
              },
            },
          },
          ...(endpoint.path === "/api/projects/{slug}"
            ? {
                "404": {
                  description: "No project with that slug.",
                  content: {
                    "application/json": {
                      schema: { type: "object" },
                    },
                  },
                },
              }
            : {}),
          ...(endpoint.path === "/api/contributions"
            ? {
                "429": {
                  description: "Rate limited. 10 requests per 30 seconds per IP.",
                  content: {
                    "application/json": {
                      schema: { type: "object" },
                    },
                  },
                },
              }
            : {}),
        },
      },
    }
  }

  return Response.json({
    openapi: "3.1.0",
    info: {
      title: `${profile.name} API`,
      version: "1.0.0",
      summary:
        "Read-only JSON endpoints for the profile, projects, and work history published at adityavikram.dev.",
      description: `Machine-readable access to the same canonical data that renders ${profile.url}. All endpoints are public, read-only, and need no authentication.`,
      contact: {
        name: profile.name,
        url: profile.url,
        email: profile.email,
      },
      license: { name: "MIT" },
    },
    servers: [{ url: profile.url, description: "Production" }],
    tags: apiTags,
    paths,
    externalDocs: {
      description: "Site, including markdown representations of every page",
      url: profile.url,
    },
  })
}
