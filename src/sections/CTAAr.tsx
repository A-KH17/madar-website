import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowLeft } from 'lucide-react';
import DemoForm from '../components/DemoForm';

gsap.registerPlugin(ScrollTrigger);

export default function CTAAr() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        dir="rtl"
      >
        <div className="container">
          <div
            ref={contentRef}
            className="max-w-3xl mx-auto text-center opacity-0"
          >
            <h2
              ref={headlineRef}
              className="display-md font-bold text-white mb-6 opacity-0 leading-tight"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              شاهد MADAR على أرض الواقع
            </h2>

            <p
              ref={descRef}
              className="text-xl text-white/80 mb-10 opacity-0"
            >
              اطلب عرضاً تجريبياً مخصصاً لترى كيف يمكن لـ MADAR أن يمنحك التحكم في تدفقاتك النقدية.
            </p>

            <button
              ref={ctaRef}
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 opacity-0 flex-row-reverse"
              style={{
                backgroundColor: '#ffffff',
                color: '#001e40',
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)',
              }}
            >
              طلب عرض تجريبي
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div
              ref={noteRef}
              className="mt-10 flex flex-col items-center gap-4 opacity-0"
            >
              <div
                className="flex items-center gap-2 px-6 py-3 rounded-full flex-row-reverse"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <Mail className="w-5 h-5 text-white/60" />
                <span className="text-white/80">info@madar.finance</span>
              </div>
              <p className="text-white/60 text-sm">
                تواصل معنا للحصول على عرض سعر حسب احتياجاتك.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DemoForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
