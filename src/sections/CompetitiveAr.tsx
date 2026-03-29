import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3, Building, Landmark } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const competitors = [
  {
    icon: BarChart3,
    title: 'أدوات المحاسبة والفوترة',
    strongIn: 'المحاسبة، الفواتير، الامتثال الضريبي',
    weakIn: 'الرؤية عبر البنوك، تنظيم التحصيل، التحكم التشغيلي',
  },
  {
    icon: Building,
    title: 'أنظمة تخطيط الموارد',
    strongIn: 'التغطية التشغيلية الواسعة، ميزات المؤسسات',
    weakIn: 'البساطة للمنشآت، السرعة، سير عمل التمويل السعودي',
  },
  {
    icon: Landmark,
    title: 'البنوك',
    strongIn: 'الحسابات، المدفوعات، الثقة، الامتثال التنظيمي',
    weakIn: 'تنسيق الأنظمة المتعددة، عمق سير العمل',
  },
];

export default function CompetitiveAr() {
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
      dir="rtl"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p ref={labelRef} className="section-label opacity-0">
            الموقف التنافسي
          </p>
          <h2
            ref={headlineRef}
            className="display-md font-bold opacity-0 leading-tight"
            style={{ color: '#001e40', fontFamily: 'Tajawal, sans-serif' }}
          >
            مدار يقع في الفجوة: فوق البنك، فوق طاقم المحاسبة.
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
              <div className="flex items-center gap-3 mb-4 flex-row-reverse">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#f4f4f2' }}
                >
                  <competitor.icon className="w-5 h-5" style={{ color: '#001e40' }} />
                </div>
                <h3
                  className="font-semibold text-sm text-right flex-1"
                  style={{ color: '#001e40', fontFamily: 'Tajawal, sans-serif' }}
                >
                  {competitor.title}
                </h3>
              </div>

              <div className="mb-3 text-right">
                <span
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: '#775a19' }}
                >
                  قوي في
                </span>
                <p
                  className="text-sm mt-1"
                  style={{ color: '#1a1c1b' }}
                >
                  {competitor.strongIn}
                </p>
              </div>

              <div className="text-right">
                <span
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: '#c3c6d1' }}
                >
                  ضعيف في
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
              alt="مدار"
              className="h-12 mx-auto mb-4"
            />
            <h3
              className="font-bold text-white mb-2"
              style={{ fontFamily: 'Tajawal, sans-serif' }}
            >
              طبقة التحكم
            </h3>
            <p
              className="text-sm"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              نبني طبقة التحكم التي تستخدمها المنشآت يومياً.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
