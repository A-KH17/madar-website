import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-12"
      style={{ backgroundColor: '#f4f4f2' }}
    >
      <div className="container">
        <div
          ref={contentRef}
          className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-0"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/images/madar-logo-dark.png"
              alt="MADAR"
              className="h-8"
            />
            <span
              className="font-semibold text-lg"
              style={{ color: '#001e40', fontFamily: 'Manrope, sans-serif' }}
            >
              MADAR
            </span>
          </div>

          {/* Contact */}
          <a
            href="mailto:info@madar.finance"
            className="flex items-center gap-2 transition-colors duration-300 hover:opacity-80"
            style={{ color: '#001e40' }}
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">info@madar.finance</span>
          </a>

          {/* Copyright */}
          <p
            className="text-sm"
            style={{ color: '#1a1c1b', opacity: 0.6 }}
          >
            © 2026 MADAR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
