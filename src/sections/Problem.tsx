import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Landmark, FileText, Wallet, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: Landmark,
    title: 'Bank Accounts',
    description: 'Across multiple portals with no unified view',
    issue: 'No real-time unified view across accounts',
  },
  {
    icon: FileText,
    title: 'Invoices & Collections',
    description: 'Managed manually with no systematic tracking',
    issue: 'No systematic follow-up on overdue invoices',
  },
  {
    icon: Wallet,
    title: 'Supplier Payments',
    description: 'In separate workflows without coordination',
    issue: 'Shortfalls discovered at payroll, not two weeks prior',
  },
  {
    icon: Calendar,
    title: 'Compliance Dates',
    description: 'Across scattered reminders and calendars',
    issue: 'Always responding to crises instead of preventing them',
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const insightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label animation
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

      // Headline animation
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

      // Description animation
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.problem-card');
        gsap.fromTo(
          cards,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
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

      // Insight box animation
      gsap.fromTo(
        insightRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: insightRef.current,
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Text */}
          <div className="lg:sticky lg:top-32">
            <p ref={labelRef} className="section-label opacity-0">
              The Real Problem
            </p>
            <h2
              ref={headlineRef}
              className="display-md font-bold mb-6 opacity-0"
              style={{ color: '#001e40', fontFamily: 'Manrope, sans-serif' }}
            >
              A typical Saudi SME is not short on business. It is short on control.
            </h2>
            <p
              ref={descRef}
              className="text-lg opacity-0"
              style={{ color: '#1a1c1b', lineHeight: 1.7 }}
            >
              Saudi SMEs are increasingly digitized but still not coordinated. They have the tools but lack the orchestration layer. The data exists. The coordination does not.
            </p>
          </div>

          {/* Right Column - Problem Cards */}
          <div ref={cardsRef} className="space-y-4">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="problem-card card p-6 opacity-0"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#f4f4f2' }}
                  >
                    <problem.icon className="w-6 h-6" style={{ color: '#001e40' }} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-semibold text-lg mb-1"
                      style={{ color: '#001e40', fontFamily: 'Manrope, sans-serif' }}
                    >
                      {problem.title}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: '#775a19' }}>
                      {problem.description}
                    </p>
                    <p className="text-sm" style={{ color: '#1a1c1b', opacity: 0.7 }}>
                      {problem.issue}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight Box */}
        <div
          ref={insightRef}
          className="mt-16 p-8 rounded-xl opacity-0"
          style={{ backgroundColor: '#001e40' }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#775a19' }}
            >
              <span className="text-white text-xl">💡</span>
            </div>
            <div>
              <p className="text-white text-lg font-medium">
                Saudi SMEs do not need more tools. They need a control layer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
