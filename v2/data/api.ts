import { profile } from './profile'

// Canonical API registry. The OpenAPI document (app/openapi.json), the API
// catalog linkset (app/.well-known/api-catalog), and the Link headers on the
// homepage all derive from this array.
//
// To add an endpoint: append one record here. The spec, the catalog, and the
// headers update together.
//
// pruned: hand-written OpenAPI paths. The request shapes are simple enough
// (query params on one endpoint, a path param on another) that generating the
// document from these records is shorter and cannot drift from the routes.

export interface ApiEndpoint {
  // Path relative to the site root, with OpenAPI-style {param} placeholders.
  path: string
  method: 'get'
  summary: string
  description: string
  tag: 'profile' | 'projects' | 'experience' | 'activity'
  // Query parameters, if any.
  params?: {
    name: string
    type: 'integer' | 'string'
    description: string
    required?: boolean
  }[]
  // Path parameters, if any.
  pathParams?: {
    name: string
    description: string
  }[]
}

export const apiEndpoints: ApiEndpoint[] = [
  {
    path: '/api/profile',
    method: 'get',
    tag: 'profile',
    summary: 'Profile',
    description:
      'The full profile as JSON: identity, location, job titles, known topics, external profiles, work history, skills, projects, and writing.',
  },
  {
    path: '/api/projects',
    method: 'get',
    tag: 'projects',
    summary: 'List projects',
    description:
      'Every project with status, technologies, repository and live URLs, and the canonical page for each.',
  },
  {
    path: '/api/projects/{slug}',
    method: 'get',
    tag: 'projects',
    summary: 'Get one project',
    description:
      'A single project by slug, including its schema.org JSON-LD and a link to its markdown representation.',
    pathParams: [
      {
        name: 'slug',
        description: 'Project slug, for example "featrs" or "aiter-commerce".',
      },
    ],
  },
  {
    path: '/api/experience',
    method: 'get',
    tag: 'experience',
    summary: 'Work history',
    description:
      'Work history with ISO 8601 start and end dates. Roles that are current omit endDate.',
  },
  {
    path: '/api/contributions',
    method: 'get',
    tag: 'activity',
    summary: 'Contribution activity',
    description:
      'GitHub contribution activity for the trailing year, proxied and cached. Rate limited to 10 requests per 30 seconds per IP and returns 429 beyond that.',
  },
]

// Named tags for the OpenAPI document.
export const apiTags = [
  { name: 'profile', description: 'Identity and attributes' },
  { name: 'projects', description: 'Open source and product work' },
  { name: 'experience', description: 'Work history' },
  { name: 'activity', description: 'Live activity signals' },
]

export const openApiUrl = `${profile.url}/openapi.json`
export const apiBaseUrl = `${profile.url}/api`
