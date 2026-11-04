import dynamic from 'next/dynamic';

import Hero from '@/components/identity/Hero';
import AboutBlurb from '@/components/identity/AboutBlurb';
import ContactLinks from '@/components/identity/ContactLinks';
import StackSection from '@/components/identity/StackSection';
import StorySection from '@/components/identity/StorySection';
import ProjectsSection from '@/components/identity/ProjectsSection';
import BlogTeaser from '@/components/identity/BlogTeaser';
import IdentityFooter from '@/components/identity/IdentityFooter';

const ActivityGraph = dynamic(
  () => import('@/components/identity/ActivityGraph'),
);

export default function HomePage() {
  return (
    <>
      <main id="main" className="page-main">
        <div className="shell page-content">
          <Hero />

          <div className="mt-16 flex flex-col">
            <AboutBlurb />
            <StackSection />
            <StorySection />
            <ProjectsSection />
            <BlogTeaser />
            <ActivityGraph />
            <ContactLinks />
          </div>
        </div>
      </main>
      <IdentityFooter />
    </>
  );
}
