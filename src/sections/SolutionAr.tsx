import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Landmark, FileText, Calculator, CreditCard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SolutionAr() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

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
        diagramRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: diagramRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          rotation: 360,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      }

      if (nodesRef.current) {
        const nodes = nodesRef.current.querySelectorAll('.tool-node');
        gsap.fromTo(
          nodes,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: nodesRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (svgRef.current) {
        const lines = svgRef.current.querySelectorAll('line');
        lines.forEach((line) => {
          const length = Math.sqrt(
            Math.pow(parseFloat(line.getAttribute('x2') || '0') - parseFloat(line.getAttribute('x1') || '0'), 2) +
            Math.pow(parseFloat(line.getAttribute('y2') || '0') - parseFloat(line.getAttribute('y1') || '0'), 2)
          );
          (line as unknown as HTMLElement).style.strokeDasharray = `${length}`;
          (line as unknown as HTMLElement).style.strokeDashoffset = `${length}`;
        });

        gsap.to(lines, {
          strokeDashoffset: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#f4f4f2' }}
      dir="rtl"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p ref={labelRef} className="section-label opacity-0">
            الحل
          </p>
          <h2
            ref={headlineRef}
            className="display-md font-bold opacity-0 leading-tight"
            style={{ color: '#001e40', fontFamily: 'Tajawal, sans-serif' }}
          >
            ليست بديلاً للأدوات الحالية — بل المكان الذي تلتقي فيها.
          </h2>
        </div>

        <div
          ref={diagramRef}
          className="relative max-w-2xl mx-auto opacity-0"
          style={{ aspectRatio: '1/1' }}
        >
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 400"
            preserveAspectRatio="xMidYMid meet"
          >
            <line x1="200" y1="200" x2="80" y2="80" stroke="#001e40" strokeWidth="2" opacity="0.3" />
            <line x1="200" y1="200" x2="320" y2="80" stroke="#001e40" strokeWidth="2" opacity="0.3" />
            <line x1="200" y1="200" x2="80" y2="320" stroke="#001e40" strokeWidth="2" opacity="0.3" />
            <line x1="200" y1="200" x2="320" y2="320" stroke="#001e40" strokeWidth="2" opacity="0.3" />
          </svg>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center relative"
              style={{ backgroundColor: '#001e40' }}
            >
              <div
                ref={orbitRef}
                className="absolute inset-0 rounded-full"
                style={{ 
                  width: 'calc(100% + 24px)', 
                  height: 'calc(100% + 24px)', 
                  margin: '-12px',
                  border: '1px dashed rgba(119, 90, 25, 0.3)'
                }}
              >
                <div
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: '#775a19',
                    top: '50%',
                    left: '100%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 12px rgba(119, 90, 25, 0.6)',
                  }}
                />
              </div>

              <img
                src="/images/madar-logo-white.png"
                alt="مدار"
                className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10"
              />
            </div>
          </div>

          <div ref={nodesRef} className="absolute inset-0">
            <div
              className="tool-node absolute opacity-0"
              style={{ top: '5%', right: '5%' }}
            >
              <div
                className="card p-4 md:p-6 flex flex-col items-center text-center"
                style={{ minWidth: '120px' }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: '#f4f4f2' }}
                >
                  <Landmark className="w-6 h-6" style={{ color: '#001e40' }} />
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: '#001e40', fontFamily: 'Tajawal, sans-serif' }}
                >
                  الحسابات البنكية
                </span>
              </div>
            </div>

            <div
              className="tool-node absolute opacity-0"
              style={{ top: '5%', left: '5%' }}
            >
              <div
                className="card p-4 md:p-6 flex flex-col items-center text-center"
                style={{ minWidth: '120px' }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: '#f4f4f2' }}
                >
                  <FileText className="w-6 h-6" style={{ color: '#001e40' }} />
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: '#001e40', fontFamily: 'Tajawal, sans-serif' }}
                >
                  الفواتير
                </span>
              </div>
            </div>

            <div
              className="tool-node absolute opacity-0"
              style={{ bottom: '5%', right: '5%' }}
            >
              <div
                className="card p-4 md:p-6 flex flex-col items-center text-center"
                style={{ minWidth: '120px' }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: '#f4f4f2' }}
                >
                  <Calculator className="w-6 h-6" style={{ color: '#001e40' }} />
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: '#001e40', fontFamily: 'Tajawal, sans-serif' }}
                >
                  المحاسبة
                </span>
              </div>
            </div>

            <div
              className="tool-node absolute opacity-0"
              style={{ bottom: '5%', left: '5%' }}
            >
              <div
                className="card p-4 md:p-6 flex flex-col items-center text-center"
                style={{ minWidth: '120px' }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: '#f4f4f2' }}
                >
                  <CreditCard className="w-6 h-6" style={{ color: '#001e40' }} />
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: '#001e40', fontFamily: 'Tajawal, sans-serif' }}
                >
                  المدفوعات
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <h4
              className="font-semibold mb-2"
              style={{ color: '#001e40', fontFamily: 'Tajawal, sans-serif' }}
            >
              ما يربطه
            </h4>
            <p className="text-sm" style={{ color: '#1a1c1b', opacity: 0.7 }}>
              الحسابات البنكية، أنظمة الفواتير، أدوات المحاسبة، سجلات المدفوعات
            </p>
          </div>
          <div className="text-center p-6">
            <h4
              className="font-semibold mb-2"
              style={{ color: '#001e40', fontFamily: 'Tajawal, sans-serif' }}
            >
              ما يجيب عليه
            </h4>
            <p className="text-sm" style={{ color: '#1a1c1b', opacity: 0.7 }}>
              المركز النقدي الآن، الفواتير المتأخرة، الالتزامات القادمة، التوقعات لـ 30 يوم
            </p>
          </div>
          <div className="text-center p-6">
            <h4
              className="font-semibold mb-2"
              style={{ color: '#001e40', fontFamily: 'Tajawal, sans-serif' }}
            >
              ما يستبدله
            </h4>
            <p className="text-sm" style={{ color: '#1a1c1b', opacity: 0.7 }}>
              جداول البيانات صباح الأحد، متابعة الواتساب اليدوية، التخمين
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
