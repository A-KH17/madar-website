import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight } from 'lucide-react';
import DemoForm from '../components/DemoForm';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Description animation
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA button animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Note animation
      gsap.fromTo(
        noteRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="section-padding"
        style={{ backgroundColor: '#001e40' }}
      >
        <div className="container">
          <div
            ref={contentRef}
            className="max-w-3xl mx-auto text-center opacity-0"
          >
            {/* Headline */}
            <h2
              ref={headlineRef}
              className="display-md font-bold text-white mb-6 opacity-0"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              See MADAR in Action
            </h2>

            {/* Description */}
            <p
              ref={descRef}
              className="text-xl text-white/80 mb-10 opacity-0"
            >
              Request a personalized demo to see how MADAR can give you control over your cash flow.
            </p>

            {/* CTA Button */}
            <button
              ref={ctaRef}
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 opacity-0"
              style={{
                backgroundColor: '#ffffff',
                color: '#001e40',
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)',
              }}
            >
              Request a Demo
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Contact Note */}
            <div
              ref={noteRef}
              className="mt-10 flex flex-col items-center gap-4 opacity-0"
            >
              <div
                className="flex items-center gap-2 px-6 py-3 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <Mail className="w-5 h-5 text-white/60" />
                <span className="text-white/80">info@madar.finance</span>
              </div>
              <p className="text-white/60 text-sm">
                Contact us for a fee quote depending on your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Form Modal */}
      <DemoForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
