/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * About Section (#about) — Director Profile & AI Architecture
 * High-end AI Production Studio & Automation Architect aesthetic.
 * Dark-mode native (deep obsidian #09090b / midnight zinc #030712).
 * Asymmetric split layout:
 * - Visual Left: Golden-ratio 4:5 Director Portrait (https://i.imgur.com/89FAjD6.png)
 *   in a high-end rounded-2xl/3xl container, gradient hairline border (border-white/10),
 *   layered with a subtle radial ambient glow / chromatic blur behind the card.
 * - Narrative Right: Micro-metric badges ("Generative Director", "AI Video Pipeline",
 *   "Automation Specialist"), commanding editorial typography, markdown narrative,
 *   technical capability tags, and studio performance pillars.
 */

import React from 'react';
import { SiteSettings, ServiceItem } from '../../types';
import { MarkdownRenderer } from '../../lib/markdown';
import { Reveal } from '../ui/Reveal';
import { ArrowUpRight, Sparkles, Terminal, Cpu, Film } from 'lucide-react';
import { DirectorsFieldMonitor } from '../ui/DirectorsFieldMonitor';

interface AboutSectionProps {
  settings: SiteSettings;
  services: ServiceItem[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings, services }) => {
  const portraitImage = settings.aboutImageUrl || 'https://i.imgur.com/89FAjD6.png';

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

  return (
    <section
      id="about"
      className="bg-[#09090b] text-[#F1EEE6] py-24 sm:py-36 px-5 sm:px-10 lg:px-16 transition-colors relative overflow-hidden border-t border-white/[0.08]"
      aria-labelledby="about-heading"
    >
      {/* Subtle Background Technical Grid & Ambient Lighting */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-[radial-gradient(circle,rgba(201,162,77,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Chapter Header */}
        <Reveal direction="up">
          <div className="flex items-center gap-3 mb-14 pb-4 border-b border-white/[0.08]">
            <span className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A24D]">
              01 · DIRECTOR PROFILE
            </span>
            <span className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              {settings.brandName || 'KEY OF DAVID'} • STUDIO ARCHITECTURE
            </span>
          </div>
        </Reveal>

        {/* Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* VISUAL LEFT (5 cols): Editorial Director Portrait (Clean, Authentic, Hairline Framed) */}
          <div className="lg:col-span-5 relative">
            <Reveal delay={0.15} direction="up">
              <DirectorsFieldMonitor
                imageUrl={portraitImage}
                ownerName={settings.ownerName}
                roleTitle={settings.title || 'AI Director & Commercial Cinematographer'}
              />
            </Reveal>
          </div>

          {/* NARRATIVE & STATS RIGHT (7 cols): Micro-Metric Badges, Editorial Typography & Core Capabilities */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Micro-Metric Badges (Mandated: Generative Director, AI Video Pipeline, Automation Specialist) */}
            <Reveal delay={0.1} direction="up">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300">
                  <Film size={13} className="text-[#C9A24D]" />
                  <span>Generative Director</span>
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300">
                  <Sparkles size={13} className="text-emerald-400" />
                  <span>AI Video Pipeline</span>
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300">
                  <Cpu size={13} className="text-cyan-400" />
                  <span>Automation Specialist</span>
                </span>
              </div>
            </Reveal>

            {/* 2. Section Headline */}
            <Reveal delay={0.2} direction="up">
              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]"
              >
                {settings.aboutHeading || 'Who I am'}
              </h2>
            </Reveal>

            {/* 3. Narrative Body with 64ch Measure */}
            <Reveal delay={0.25} direction="up">
              <div className="max-w-[64ch] text-zinc-300 text-base sm:text-lg leading-[1.8] space-y-4">
                <MarkdownRenderer
                  content={
                    settings.aboutBody ||
                    `I am ${settings.ownerName}, working under the brand ${settings.brandName}.\n\nI make AI videos, AI images, video scripts, storytelling content, blog/content writing, social media content, and AI automations/agents for businesses.`
                  }
                />
              </div>
            </Reveal>

            {/* 4. Studio Micro-Pillars (Vercel & Linear Standard) */}
            <Reveal delay={0.3} direction="up">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#C9A24D] block">
                    Cinema Grade
                  </span>
                  <p className="text-sm text-zinc-300 font-medium">4K+ Gen-Media</p>
                  <p className="text-xs text-zinc-500">Photorealistic motion & visual direction</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 block">
                    Efficiency
                  </span>
                  <p className="text-sm text-zinc-300 font-medium">Autonomous Pipelines</p>
                  <p className="text-xs text-zinc-500">Automating high-friction business operations</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 block">
                    Retention
                  </span>
                  <p className="text-sm text-zinc-300 font-medium">Bespoke Narrative</p>
                  <p className="text-xs text-zinc-500">High-converting scripts & storytelling</p>
                </div>
              </div>
            </Reveal>

            {/* 5. Published Core Capabilities (What I Do) */}
            {services.length > 0 && (
              <Reveal delay={0.35} direction="up">
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400">
                    Core Capabilities & Tooling
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <span
                        key={service.id}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300 hover:border-[#C9A24D]/50 hover:text-white transition-all"
                      >
                        <span role="img" aria-label={service.title} className="text-sm">
                          {service.icon}
                        </span>
                        <span>{service.title}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* 6. Direct Action Anchors */}
            <Reveal delay={0.4} direction="up">
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="px-5 py-2.5 rounded-lg bg-white text-zinc-950 hover:bg-[#C9A24D] hover:text-zinc-950 font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-all duration-200 cursor-pointer"
                >
                  <span>Work With Me</span>
                  <ArrowUpRight size={14} />
                </button>
                <button
                  onClick={() => handleScrollTo('portfolio')}
                  className="px-5 py-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 font-mono text-xs uppercase tracking-wider font-medium inline-flex items-center gap-2 transition-all duration-200 cursor-pointer"
                >
                  <span>View Selected Works</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
