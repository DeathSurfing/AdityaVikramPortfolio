// Adapters: canonical data in, schema.org JSON-LD out. Consumed by layout.tsx
// (site-wide graph) and the project pages (per-project nodes).

import { profile } from '@/data/profile'
import { projects, type Project } from '@/data/projects'
import { experiences } from '@/data/identity'
import { siteConfig } from '@/data/site'
import type { BlogPost } from '@/lib/blog'

function absoluteUrl(value: string): string {
  return value.startsWith('http') ? value : `${siteConfig.url}${value}`
}

const personImage = {
  '@type': 'ImageObject',
  url: absoluteUrl(profile.image),
  width: 256,
  height: 256,
}

const person = {
  '@type': 'Person',
  '@id': `${profile.url}/#person`,
  name: profile.name,
  alternateName: profile.alternateNames,
  url: profile.url,
  image: personImage,
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
      '@type': 'WebPage',
      '@id': `${profile.url}/#webpage`,
      url: profile.url,
      name: profile.headline,
      description: profile.shortBio,
      isPartOf: { '@id': `${profile.url}/#website` },
      about: { '@id': `${profile.url}/#person` },
      mainEntity: { '@id': `${profile.url}/#person` },
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
    '@type': 'CollectionPage',
    '@id': `${siteConfig.url}/experience/#collection`,
    url: `${siteConfig.url}/experience`,
    name: `Experience - ${profile.name}`,
    about: { '@id': `${profile.url}/#person` },
    isPartOf: { '@id': `${profile.url}/#website` },
    mainEntity: { '@id': `${profile.url}/#person` },
    hasPart: experiences.map((exp) => ({
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

export function articleJsonLd(post: BlogPost, slug: string) {
  const url = `${siteConfig.url}/blog/${slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}/#article`,
    headline: post.title,
    description: post.description,
    image: post.coverImage ? absoluteUrl(post.coverImage) : undefined,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@id': `${profile.url}/#person` },
    publisher: { '@id': `${profile.url}/#person` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': `${profile.url}/#website` },
    keywords: post.tags.join(', '),
    articleSection: post.tags[0],
    inLanguage: 'en',
  }
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function profilePageJsonLd(recentPosts: BlogPost[] = []) {
  const url = `${profile.url}/about`

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}/#profilepage`,
    url,
    name: `About ${profile.name}`,
    description: profile.shortBio,
    dateModified: profile.updated,
    isPartOf: { '@id': `${profile.url}/#website` },
    mainEntity: person,
    ...(recentPosts.length > 0
      ? {
          hasPart: recentPosts.map((post) => ({
            '@type': 'Article',
            headline: post.title,
            url: `${profile.url}/blog/${post.slug}`,
            datePublished: post.date,
            author: { '@id': `${profile.url}/#person` },
          })),
        }
      : {}),
  }
}
