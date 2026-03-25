import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3, Building, Landmark } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const competitors = [
  {
    icon: BarChart3,
    title: 'Accounting / E-Invoicing Tools',
    strongIn: 'Bookkeeping, invoicing, tax compliance',
    weakIn: 'Cross-bank visibility, collections orchestration, operating control',
  },
  {
    icon: Building,
    title: 'ERP Systems',
    strongIn: 'Broad operational coverage, enterprise features',
    weakIn: 'SME simplicity, speed, Saudi-specific finance workflows',
  },
  {
    icon: Landmark,
    title: 'Banks',
    strongIn: 'Accounts, payments, trust, regulatory compliance',
    weakIn: 'Multi-system coordination, workflow depth',
  },
];

export default function Competitive() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.competitor-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      gsap.fromTo(
        centerRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: centerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#f9f9f7' }}
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p ref={labelRef} className="section-label opacity-0">
            Competitive Position
          </p>
          <h2
            ref={headlineRef}
            className="display-md font-bold opacity-0"
            style={{ color: '#001e40', fontFamily: 'Manrope, sans-serif' }}
          >
            MADAR sits in the gap: above the bank, above the accounting stack.
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
        >
          {competitors.map((competitor, index) => (
            <div
              key={index}
              className="competitor-card card p-6 opacity-0"
              style={{ backgroundColor: '#ffffff' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#f4f4f2' }}
                >
                  <competitor.icon className="w-5 h-5" style={{ color: '#001e40' }} />
                </div>
                <h3
                  className="font-semibold text-sm"
                  style={{ color: '#001e40', fontFamily: 'Manrope, sans-serif' }}
                >
                  {competitor.title}
                </h3>
              </div>

              <div className="mb-3">
                <span
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: '#775a19' }}
                >
                  Strong in
                </span>
                <p
                  className="text-sm mt-1"
                  style={{ color: '#1a1c1b' }}
                >
                  {competitor.strongIn}
                </p>
              </div>

              <div>
                <span
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: '#c3c6d1' }}
                >
                  Weak in
                </span>
                <p
                  className="text-sm mt-1"
                  style={{ color: '#1a1c1b', opacity: 0.6 }}
                >
                  {competitor.weakIn}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={centerRef}
          className="text-center opacity-0"
        >
          <div
            className="card p-6 md:p-8 text-center mx-auto inline-block"
            style={{
              backgroundColor: '#001e40',
              maxWidth: '320px',
            }}
          >
            <img
              src="/images/madar-logo-white.png"
              alt="MADAR"
              className="h-12 mx-auto mb-4"
            />
            <h3
              className="font-bold text-white mb-2"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              The Control Layer
            </h3>
            <p
              className="text-sm"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              We are building the control layer that the SME uses every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
