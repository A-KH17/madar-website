import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CreditCard, Building2, FileCheck, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: CreditCard,
    value: 79,
    suffix: '%',
    label: 'Electronic Payment Adoption',
    description: 'Surpassed the 2025 Vision target ahead of schedule',
  },
  {
    icon: Building2,
    value: null,
    text: 'Open Banking',
    label: 'SAMA Framework',
    description: 'Secure, consent-based data sharing now enabled',
  },
  {
    icon: FileCheck,
    value: null,
    text: 'E-Invoicing',
    label: 'ZATCA Phase 2',
    description: 'Mandatory digital invoice infrastructure',
  },
  {
    icon: Briefcase,
    value: 1.7,
    suffix: 'M',
    label: 'Active Commercial Registrations',
    description: 'SMEs contribute 28-29% of GDP',
  },
];

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(
        { val: 0 },
        {
          val: value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: function () {
            setDisplayValue(Number(this.targets()[0].val.toFixed(1)));
          },
        }
      );
    });

    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function MarketTiming() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.stat-card');
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#f4f4f2' }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p ref={labelRef} className="section-label opacity-0">
            Market Timing
          </p>
          <h2
            ref={headlineRef}
            className="display-md font-bold opacity-0"
            style={{ color: '#001e40', fontFamily: 'Manrope, sans-serif' }}
          >
            The timing in Saudi Arabia is unusually strong
          </h2>
        </div>

        {/* Stats Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card card p-6 md:p-8 text-center opacity-0"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#001e40' }}
              >
                <stat.icon className="w-7 h-7 text-white" />
              </div>

              {/* Value */}
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: '#001e40', fontFamily: 'Manrope, sans-serif' }}
              >
                {stat.value !== null ? (
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                ) : (
                  <span>{stat.text}</span>
                )}
              </div>

              {/* Label */}
              <h3
                className="font-semibold mb-2"
                style={{ color: '#001e40', fontFamily: 'Manrope, sans-serif' }}
              >
                {stat.label}
              </h3>

              {/* Description */}
              <p
                className="text-sm"
                style={{ color: '#1a1c1b', opacity: 0.7 }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div
          className="mt-12 text-center p-6 rounded-xl"
          style={{ backgroundColor: '#001e40' }}
        >
          <p className="text-white text-lg">
            Saudi SMEs no longer need basic digitization. They need orchestration.{' '}
            <span className="font-semibold">MADAR is that layer.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
