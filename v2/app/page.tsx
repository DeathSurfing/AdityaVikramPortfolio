import MotionRoot from '@/components/identity/MotionRoot';
import Hero from '@/components/identity/Hero';
import AboutBlurb from '@/components/identity/AboutBlurb';
import ContactLinks from '@/components/identity/ContactLinks';
import StackSection from '@/components/identity/StackSection';
import StorySection from '@/components/identity/StorySection';
import ProjectsSection from '@/components/identity/ProjectsSection';
import ActivityGraph from '@/components/identity/ActivityGraph';
import IdentityFooter from '@/components/identity/IdentityFooter';

export default function HomePage() {
  return (
    <MotionRoot>
      <main className="min-h-screen bg-[#0a0a0a] font-sans text-[#e5e5e5] selection:bg-[#e5e5e5] selection:text-[#0a0a0a]">
        <div className="mx-auto flex max-w-2xl flex-col gap-16 px-6 pt-32 pb-20">
          <Hero />
          <AboutBlurb />
          <ContactLinks />
          <StackSection />
          <StorySection />
          <ProjectsSection />
          <ActivityGraph />
        </div>
        <IdentityFooter />
      </main>
    </MotionRoot>
  );
}
