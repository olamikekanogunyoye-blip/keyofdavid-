/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Hero Section (#home)
 * 100svh, 12-column Swiss editorial layout.
 * Left 7 cols: Title, Name, Headline line-by-line masked reveal with Instrument Serif italic Brass accent.
 * Right 5 cols: 4:5 portrait frame with Ken Burns zoom, subtle duotone overlay, and offset frame line.
 * Desktop: Soft Brass spotlight follows pointer slightly.
 * Mobile: Portrait first (4:5), name below, fluid typography tested down to 360px.
 */

import React, { useState } from 'react';
import { SiteSettings } from '../../types';
import { Button } from '../ui/Button';
import { KeyGlyph } from '../ui/KeyLogo';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { DirectorsFieldMonitor } from '../ui/DirectorsFieldMonitor';

interface HeroSectionProps {
  settings: SiteSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const heroImage = settings.heroImageUrl || 'https://i.imgur.com/89FAjD6.png';

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    setMouseOffset({ x, y });
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  // Headline styling: split or render with emphasized word
  const renderHeadline = (headline: string) => {
    const text = headline || 'Ideas, turned into cinema.';
    // If text contains "cinema", emphasize it. Otherwise emphasize the last word.
    const words = text.split(' ');
    return (
      <>
        {words.map((word, idx) => {
          const isAccent =
            word.toLowerCase().includes('cinema') ||
            (!text.toLowerCase().includes('cinema') && idx === words.length - 1);

          return (
            <span key={idx} className="inline-block mr-[0.25em]">
              {isAccent ? (
                <span className="font-serif-accent text-[#C9A24D] font-normal lowercase tracking-normal">
                  {word}
                </span>
              ) : (
                word
              )}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] pt-24 pb-10 px-5 sm:px-10 lg:px-16 flex flex-col justify-between max-w-[1440px] mx-auto overflow-hidden"
    >
      {/* Anamorphic Lens Flare & Volumetric Lighting */}
      <div
        className="hidden lg:block absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(201, 162, 77, 0.10) 0%, transparent 70%)',
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
        aria-hidden="true"
      />
      <div
        className="hidden lg:block absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Main Grid Content */}
      <div className="my-auto py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* MOBILE ONLY: Portrait first under navbar */}
        <div className="block lg:hidden w-full max-w-xs mx-auto">
          <DirectorsFieldMonitor
            imageUrl={heroImage}
            ownerName={settings.ownerName}
            roleTitle={settings.title}
            showDirectorTag={false}
          />
        </div>

        {/* LEFT: 7 Columns Text Content */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10">
          {/* Title Mono Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#C9A24D] shadow-[0_0_8px_rgba(201,162,77,0.7)]" />
            <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C9A24D] font-medium">
              {settings.title || 'Creative AI Creator & AI Automation Agent'}
            </span>
          </motion.div>

          {/* Owner Name */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-[#8A877F] mb-3"
          >
            {settings.ownerName || 'Olamilekan Ogunyoye David'}
          </motion.p>

          {/* Giant Display Headline with Masked Reveal */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display uppercase tracking-tight text-[#F1EEE6]"
              style={{ textWrap: 'balance' }}
            >
              {renderHeadline(settings.heroHeadline)}
            </motion.h1>
          </div>

          {/* Intro Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg lg:text-xl text-[#8A877F] max-w-xl leading-[1.65] mb-10"
          >
            {settings.heroIntro ||
              'I create AI videos, images and stories, and build AI automations that give businesses their time back.'}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('portfolio');
              }}
              icon={<ArrowUpRight size={18} />}
            >
              {settings.ctaPrimaryLabel || 'View My Work'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('contact');
              }}
            >
              {settings.ctaSecondaryLabel || 'Work With Me'}
            </Button>
          </motion.div>
        </div>

        {/* RIGHT: 5 Columns Desktop Director's Field Monitor */}
        <div className="hidden lg:block lg:col-span-5 relative">
          <DirectorsFieldMonitor
            imageUrl={heroImage}
            ownerName={settings.ownerName}
            roleTitle={settings.title || 'AI Director & Commercial Cinematographer'}
          />
        </div>
      </div>

      {/* Bottom Status & Scroll Strip */}
      <div className="border-t border-[rgba(241,238,230,0.1)] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-[#8A877F]">
        <div className="flex items-center gap-2">
          {settings.availabilityText && (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{settings.availabilityText}</span>
            </>
          )}
        </div>
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo('about');
          }}
          className="flex items-center gap-2 hover:text-[#C9A24D] transition-colors uppercase tracking-widest text-[11px]"
        >
          <span>SCROLL</span>
          <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
};
