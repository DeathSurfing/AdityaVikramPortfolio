// Adapters: canonical data in, schema.org JSON-LD out. Consumed by layout.tsx
// (site-wide graph) and the project pages (per-project nodes).

import { profile } from '@/data/profile'
import { projects, type Project } from '@/data/projects'
import { experiences } from '@/data/identity'
import { siteConfig } from '@/data/site'

const person = {
  '@type': 'Person',
  '@id': `${profile.url}/#person`,
  name: profile.name,
  alternateName: profile.alternateNames,
  url: profile.url,
  image: `${profile.url}${profile.image}`,
  jobTitle: profile.jobTitles,
  description: profile.shortBio,
  email: `mailto:${profile.email}`,
  sameAs: profile.sameAs,
  knowsAbout: profile.knowsAbout,
  address: {
    '@type': 'PostalAddress',
    addressLocality: profile.location.city,
    addressRegion: profile.location.region,
    addressCountry: profile.location.countryCode,
  },
  affiliation: profile.affiliations.map((org) => ({
    '@type': 'Organization',
    name: org.name,
    url: org.url,
  })),
}

// Site-wide graph injected once in the root layout.
export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    person,
    {
      '@type': 'WebSite',
      '@id': `${profile.url}/#website`,
      name: profile.name,
      url: profile.url,
      description: profile.shortBio,
      publisher: { '@id': `${profile.url}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${profile.url}/#profilepage`,
      url: profile.url,
      name: profile.headline,
      // mainEntity is the property Google reads for the profile page rich
      // result; about alone does not satisfy it. References the Person node
      // by @id rather than inlining it, so the Person is defined once in the
      // graph.
      mainEntity: { '@id': `${profile.url}/#person` },
      about: { '@id': `${profile.url}/#person` },
      isPartOf: { '@id': `${profile.url}/#website` },
    },
  ],
}

export function projectJsonLd(project: Project) {
  const node =
    project.type === 'open-source'
      ? {
          '@type': 'SoftwareSourceCode',
          codeRepository: project.repository,
          programmingLanguage: project.technologies[0],
        }
      : {
          '@type': 'SoftwareApplication',
          applicationCategory: 'WebApplication',
        }

  return {
    '@context': 'https://schema.org',
    ...node,
    '@id': `${siteConfig.url}/projects/${project.slug}/#project`,
    name: project.name,
    description: project.description,
    url: `${siteConfig.url}/projects/${project.slug}`,
    keywords: project.technologies.join(', '),
    author: { '@id': `${profile.url}/#person` },
    ...(project.live ? { sameAs: project.live } : {}),
    ...(project.registry ? { installUrl: project.registry } : {}),
  }
}

export function experienceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteConfig.url}/experience/#profilepage`,
    url: `${siteConfig.url}/experience`,
    name: `Experience - ${profile.name}`,
    about: { '@id': `${profile.url}/#person` },
    isPartOf: { '@id': `${profile.url}/#website` },
    mainEntity: experiences.map((exp) => ({
      '@type': 'EmployeeRole',
      roleName: exp.role,
      description: exp.summary,
      startDate: exp.startDate,
      ...(exp.endDate ? { endDate: exp.endDate } : {}),
      worksFor: {
        '@type': 'Organization',
        name: exp.company,
      },
    })),
  }
}

export function projectsIndexJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteConfig.url}/projects/#collection`,
    name: `Projects by ${profile.name}`,
    url: `${siteConfig.url}/projects`,
    about: { '@id': `${profile.url}/#person` },
    hasPart: projects.map((p) => projectJsonLd(p)),
  }
}
