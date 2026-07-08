import Hero from '@/components/Hero';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Achievements from '@/components/Achievements';
import WhyHireMe from '@/components/WhyHireMe';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Skills />
      <Experience />
      <Education />
      <Achievements />
      <WhyHireMe />
      <Contact />
    </>
  );
}
