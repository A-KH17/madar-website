import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import DemoForm from '../components/DemoForm';

export default function HeroAr() {
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
        dir="rtl"
      >
        <div className="text-center max-w-4xl mx-auto">
          <img
            ref={logoRef}
            src="/images/madar-logo-white.png"
            alt="MADAR"
            className="h-20 md:h-28 mx-auto mb-4 opacity-0"
          />

          <div
            ref={brandRef}
            className="text-5xl md:text-7xl font-black text-white mb-6 opacity-0 tracking-wider"
            style={{ fontFamily: 'Tajawal, sans-serif' }}
          >
            مدار
          </div>

          <h1
            ref={headlineRef}
            className="text-2xl md:text-4xl font-bold text-white mb-6 opacity-0 leading-tight"
            style={{ fontFamily: 'Tajawal, sans-serif' }}
          >
            منصة التحكم بالتدفقات النقدية للمنشآت السعودية
          </h1>

          <p
            ref={subheadlineRef}
            className="text-xl md:text-2xl text-white/80 mb-10 opacity-0"
            style={{ fontFamily: 'Tajawal, sans-serif' }}
          >
            النقد. التحصيل. الالتزامات. التحكم.
          </p>

          <button
            ref={ctaRef}
            onClick={() => setIsFormOpen(true)}
            className="btn-primary text-lg px-8 py-4 opacity-0"
            style={{ fontFamily: 'Tajawal, sans-serif' }}
          >
            طلب عرض تجريبي
          </button>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 right-1/2 translate-x-1/2 opacity-0"
        >
          <div className="scroll-indicator flex flex-col items-center text-white/60">
            <span className="text-sm mb-2" style={{ fontFamily: 'Tajawal, sans-serif' }}>مرر للاستكشاف</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </section>

      <DemoForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
