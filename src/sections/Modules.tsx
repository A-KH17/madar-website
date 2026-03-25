import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const modules = [
  {
    image: '/images/module-cash.png',
    title: 'Cash Dashboard',
    description: 'Unified view of all bank accounts with real-time balances. See your total cash position at a glance.',
  },
  {
    image: '/images/module-invoices.png',
    title: 'Overdue Invoice Tracking',
    description: 'Systematic tracking of overdue invoices with aging analysis. Know exactly who owes what and for how long.',
  },
  {
    image: '/images/module-collections.png',
    title: 'Collections Workflow',
    description: 'Priority queue for collections with assigned follow-ups. Focus on the highest-impact accounts first.',
  },
  {
    image: '/images/module-obligations.png',
    title: 'Upcoming Obligations',
    description: 'Calendar view of all upcoming payments and obligations. Never miss a deadline.',
  },
  {
    image: '/images/module-forecast.png',
    title: 'Simple Forecast',
    description: '30-day cash forecast based on expected inflows and outflows. Predict shortfalls before they happen.',
  },
];

export default function Modules() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCard = (index: number) => {
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll('.module-card');
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        setActiveIndex(index);
      }
    }
  };

  const handlePrev = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : modules.length - 1;
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex < modules.length - 1 ? activeIndex + 1 : 0;
    scrollToCard(newIndex);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const cards = carousel.querySelectorAll('.module-card');
      const carouselRect = carousel.getBoundingClientRect();
      const centerX = carouselRect.left + carouselRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(centerX - cardCenterX);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#f9f9f7' }}
    >
      <div className="container">
        <div className="max-w-2xl mb-12">
          <p ref={labelRef} className="section-label opacity-0">
            Product Modules
          </p>
          <h2
            ref={headlineRef}
            className="display-md font-bold mb-4 opacity-0"
            style={{ color: '#001e40', fontFamily: 'Manrope, sans-serif' }}
          >
            Five Modules. One Workflow.
          </h2>
          <p
            ref={descRef}
            className="text-lg opacity-0"
            style={{ color: '#1a1c1b', opacity: 0.8 }}
          >
            The MVP solves one problem cluster: short-term cash visibility and overdue invoice control.
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#f4f4f2', color: '#001e40' }}
            aria-label="Previous module"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#f4f4f2', color: '#001e40' }}
            aria-label="Next module"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div
          ref={carouselRef}
          className="carousel-container opacity-0"
        >
          {modules.map((module, index) => (
            <div
              key={index}
              className="module-card carousel-card"
            >
              <div
                className="h-full overflow-hidden rounded-xl"
                style={{
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 24px rgba(26, 28, 27, 0.08)',
                }}
              >
                <img
                  src={module.image}
                  alt={module.title}
                  className="w-full h-48 md:h-56 object-cover"
                />
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: '#001e40', fontFamily: 'Manrope, sans-serif' }}
                  >
                    {module.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: '#1a1c1b', opacity: 0.7, lineHeight: 1.6 }}
                  >
                    {module.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {modules.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: activeIndex === index ? '#001e40' : '#c3c6d1',
                transform: activeIndex === index ? 'scale(1.5)' : 'scale(1)',
              }}
              aria-label={`Go to module ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
