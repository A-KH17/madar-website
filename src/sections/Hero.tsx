import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import DemoForm from '../components/DemoForm';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6 }
      )
        .fromTo(
          brandRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        )
        .fromTo(
          subheadlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="min-h-screen flex flex-col items-center justify-center relative px-6"
        style={{ backgroundColor: '#001e40' }}
      >
        {/* Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <img
            ref={logoRef}
            src="/images/madar-logo-white.png"
            alt="MADAR"
            className="h-20 md:h-28 mx-auto mb-4 opacity-0"
          />

          {/* Brand Name */}
          <div
            ref={brandRef}
            className="text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 tracking-wider"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            MADAR
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-2xl md:text-4xl font-bold text-white mb-6 opacity-0"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            The Cash Control Platform for Saudi SMEs
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-xl md:text-2xl text-white/80 mb-10 opacity-0"
          >
            Cash. Collections. Obligations. Control.
          </p>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            onClick={() => setIsFormOpen(true)}
            className="btn-primary text-lg px-8 py-4 opacity-0"
          >
            Request a Demo
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
        >
          <div className="scroll-indicator flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Demo Form Modal */}
      <DemoForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
