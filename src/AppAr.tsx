import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroAr from './sections/HeroAr';
import ProblemAr from './sections/ProblemAr';
import SolutionAr from './sections/SolutionAr';
import CompetitiveAr from './sections/CompetitiveAr';
import ModulesAr from './sections/ModulesAr';
import CTAAr from './sections/CTAAr';
import FooterAr from './sections/FooterAr';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function AppAr() {
  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen" dir="rtl" style={{ fontFamily: 'Tajawal, sans-serif' }}>
      <LanguageSwitcher currentLang="ar" />
      <HeroAr />
      <ProblemAr />
      <SolutionAr />
      <section className="py-12" style={{ backgroundColor: '#001e40' }} dir="rtl">
        <div className="container text-center">
          <p className="text-white text-lg md:text-xl" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            المنشآت السعودية لم تعد تحتاج التحول الرقمي الأساسي. تحتاج التنسيق.{' '}
            <span className="font-bold" style={{ color: '#fed488' }}>
              مدار هو تلك الطبقة.
            </span>
          </p>
        </div>
      </section>
      <CompetitiveAr />
      <ModulesAr />
      <CTAAr />
      <FooterAr />
    </main>
  );
}

function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const otherLang = currentLang === 'en' ? 'ar' : 'en';
  const otherLabel = currentLang === 'en' ? 'العربية' : 'English';
  const targetPath = otherLang === 'en' ? '/' : '/ar';

  return (
    <div className="fixed top-4 left-4 z-50" style={{ direction: 'ltr' }}>
      <a
        href={targetPath}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#001e40',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Tajawal, sans-serif',
        }}
      >
        {otherLabel}
      </a>
    </div>
  );
}

export default AppAr;
