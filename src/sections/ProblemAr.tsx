import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Landmark, FileText, Wallet, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: Landmark,
    title: 'الحسابات البنكية',
    description: 'البيانات محبوسة في بوابات بنكية منفصلة',
    issue: 'تسجيل الدخول اليدوي لكل حساب — لا يوجد لوحة تحكم موحدة',
  },
  {
    icon: FileText,
    title: 'الفواتير والتحصيل',
    description: 'مشتتة بين جداول البيانات والبريد الإلكتروني',
    issue: 'الفواتير المتأخرة تمر دون متابعة منتظمة',
  },
  {
    icon: Wallet,
    title: 'مدفوعات الموردين',
    description: 'في سير عمل منفصلة دون تنسيق',
    issue: 'العجز يُكتشف عند الرواتب، وليس أسبوعين قبلها',
  },
  {
    icon: Calendar,
    title: 'مواعيد الالتزام',
    description: 'موزعة بين التذكيرات والتقويمات المشتتة',
    issue: 'دائماً الاستجابة للأزمات بدلاً من منعها',
  },
];

export default function ProblemAr() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const insightRef = useRef<HTMLDivElement>(null);

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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.problem-card');
        gsap.fromTo(
          cards,
          { opacity: 0, x: -60 },
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
      dir="rtl"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Right Column - Text (now on right in RTL) */}
          <div className="lg:sticky lg:top-32 order-2 lg:order-1">
            <p ref={labelRef} className="section-label opacity-0">
              المشكلة الحقيقية
            </p>
            <h2
              ref={headlineRef}
              className="display-md font-bold mb-6 opacity-0 leading-tight"
              style={{ color: '#001e40', fontFamily: 'Tajawal, sans-serif' }}
            >
              المنشآت السعودية لا تعاني من قلة الأعمال. تعاني من قلة التحكم.
            </h2>
            <p
              ref={descRef}
              className="text-lg opacity-0"
              style={{ color: '#1a1c1b', lineHeight: 1.7, fontFamily: 'Tajawal, sans-serif' }}
            >
              المنشآت الصغيرة والمتوسطة في السعودية رقمية بشكل متزايد لكنها غير منسقة. لديها الأدوات لكنها تفتقر لطبقة التنسيق. البيانات موجودة. التنسيق مفقود.
            </p>
          </div>

          {/* Left Column - Problem Cards (now on left in RTL) */}
          <div ref={cardsRef} className="space-y-4 order-1 lg:order-2">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="problem-card card p-6 opacity-0"
              >
                <div className="flex items-start gap-4 flex-row-reverse">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#f4f4f2' }}
                  >
                    <problem.icon className="w-6 h-6" style={{ color: '#001e40' }} />
                  </div>
                  <div className="flex-1 text-right">
                    <h3
                      className="font-semibold text-lg mb-1"
                      style={{ color: '#001e40', fontFamily: 'Tajawal, sans-serif' }}
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
          dir="rtl"
        >
          <div className="flex items-start gap-4 flex-row-reverse">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#775a19' }}
            >
              <span className="text-white text-xl">💡</span>
            </div>
            <div className="text-right">
              <p className="text-white text-lg font-medium">
                المنشآت السعودية لا تحتاج المزيد من الأدوات. تحتاج طبقة تحكم.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
