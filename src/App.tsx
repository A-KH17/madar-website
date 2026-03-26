import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import Competitive from './sections/Competitive';
import Modules from './sections/Modules';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      {/* Orchestration Banner */}
      <section className="py-12" style={{ backgroundColor: '#001e40' }}>
        <div className="container text-center">
          <p className="text-white text-lg md:text-xl">
            Saudi SMEs no longer need basic digitization. They need orchestration.{' '}
            <span className="font-semibold" style={{ color: '#fed488' }}>
              MADAR is that layer.
            </span>
          </p>
        </div>
      </section>
      <Competitive />
      <Modules />
      <CTA />
      <Footer />
    </main>
  );
}

export default App;
