/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Contact & Inquiries Section (#contact)
 * - Headline: "Let's make something unforgettable."
 * - Left column: Redesigned to lead with Direct Contact:
 *   1. Large primary card "Chat on WhatsApp" in Brass (full width on mobile) with "Fastest way to reach me"
 *      and formatted number.
 *   2. Second card "Call my hotline" with formatted number as tel: link.
 *   3. Email direct link, phone (if distinct), location (if filled).
 *   4. Desktop QR Code: "Scan to chat from your phone".
 *   5. Connect Across Channels (social icons).
 * - Right column: Message form with Name, Email, Subject, Message, bot honeypot trap,
 *   client validation, 30s rate-limiting, and direct write to messages collection.
 */

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { SiteSettings, SocialLinkItem } from '../../types';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { useToast } from '../ui/Toast';
import { submitContactMessage } from '../../lib/db';
import {
  buildWhatsAppLink,
  buildTelLink,
  formatPhoneDisplay,
} from '../../lib/contact';
import { WhatsAppSolidIcon } from '../ui/WhatsAppIcon';
import { SocialLinksCluster } from '../ui/SocialLinksCluster';
import { Mail, MapPin, Phone, Send, CheckCircle2, ShieldAlert, ArrowUpRight, QrCode } from 'lucide-react';

interface ContactSectionProps {
  settings: SiteSettings;
  socialLinks?: SocialLinkItem[];
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  socialLinks = [],
}) => {
  const { showToast } = useToast();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // invisible bot trap
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  const validSocialLinks = socialLinks.filter(
    (l) => l.published && l.url && l.url.trim().length > 0
  );

  // Generate QR Code for WhatsApp link on desktop
  useEffect(() => {
    if (settings.whatsappNumber) {
      try {
        const waUrl = buildWhatsAppLink(
          settings.whatsappNumber,
          settings.whatsappMessage || "Hello KEY OF DAVID, I found your portfolio and I'd like to work with you."
        );
        QRCode.toDataURL(waUrl, {
          width: 140,
          margin: 1,
          color: {
            dark: '#0B0B0C',
            light: '#F1EEE6',
          },
        })
          .then((url) => setQrCodeDataUrl(url))
          .catch((err) => console.warn('QR Code generation error:', err));
      } catch (err) {
        console.warn('QR Code error:', err);
      }
    }
  }, [settings.whatsappNumber, settings.whatsappMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Bot trap check
    if (formState.honeypot.trim().length > 0) {
      // Quietly reject bots without alerting them
      setIsSuccess(true);
      return;
    }

    // Rate Limiting: 1 submission per 30 seconds
    const lastSubmitTime = localStorage.getItem('kod_last_contact_submit');
    const now = Date.now();
    if (lastSubmitTime && now - parseInt(lastSubmitTime, 10) < 30000) {
      const waitSeconds = Math.ceil((30000 - (now - parseInt(lastSubmitTime, 10))) / 1000);
      const msg = `Please wait ${waitSeconds}s before transmitting another message.`;
      setErrorMessage(msg);
      showToast(msg, 'error');
      return;
    }

    // Input Validation
    const name = formState.name.trim();
    const email = formState.email.trim();
    const subject = formState.subject.trim() || 'Portfolio Inquiry';
    const message = formState.message.trim();

    if (!name || name.length > 100) {
      setErrorMessage('Please provide your name (up to 100 characters).');
      return;
    }
    if (!email || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (subject.length > 200) {
      setErrorMessage('Subject must not exceed 200 characters.');
      return;
    }
    if (!message || message.length > 5000) {
      setErrorMessage('Please provide a message (up to 5,000 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactMessage({
        name,
        email,
        subject,
        message,
      });

      localStorage.setItem('kod_last_contact_submit', Date.now().toString());
      setIsSuccess(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
      });
      showToast('Inquiry transmitted successfully. I will be in touch.', 'success');
    } catch (err: any) {
      const msg = err.message || 'Failed to transmit message. Please contact via direct email.';
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappHref = settings.whatsappNumber
    ? buildWhatsAppLink(
        settings.whatsappNumber,
        settings.whatsappMessage || "Hello KEY OF DAVID, I found your portfolio and I'd like to work with you."
      )
    : '';

  const hotlineHref = settings.hotline ? buildTelLink(settings.hotline) : '';

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 px-5 sm:px-10 lg:px-16 border-t border-[rgba(241,238,230,0.1)] bg-[#0B0B0C]"
      aria-labelledby="contact-chapter-title"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Chapter Header */}
        <Reveal direction="up">
          <div className="flex items-center justify-between mb-16 pb-4 border-b border-[rgba(241,238,230,0.1)]">
            <span
              id="contact-chapter-title"
              className="font-mono text-xs uppercase tracking-[0.25em] text-[#C9A24D]"
            >
              05 / CONTACT
            </span>
            <span className="font-mono text-xs text-[#8A877F] uppercase tracking-wider">
              Work With Me
            </span>
          </div>
        </Reveal>

        {/* Section Headline */}
        <Reveal delay={0.1} direction="up">
          <div className="mb-16">
            <h2 className="font-display uppercase tracking-tight text-[#F1EEE6] max-w-4xl text-3xl sm:text-5xl lg:text-7xl font-bold">
              Let's make something <span className="font-serif-accent text-[#C9A24D] lowercase">unforgettable.</span>
            </h2>
          </div>
        </Reveal>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT 5 Columns: Redesigned to lead with Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={0.15} direction="up">
              <p className="text-base sm:text-lg text-[#8A877F] leading-relaxed max-w-md">
                Available for high-stakes creative direction, bespoke AI image and video production, cinematic scripting, and intelligent workflow automation systems.
              </p>
            </Reveal>

            {/* 1. Large Primary Card: Chat on WhatsApp (in Brass) */}
            {settings.whatsappNumber && (
              <Reveal delay={0.2} direction="up">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full p-6 sm:p-7 bg-[#C9A24D] text-[#0B0B0C] border border-[#C9A24D] shadow-[0_12px_32px_rgba(201,162,77,0.2)] hover:bg-[#e0b95c] hover:shadow-[0_16px_40px_rgba(201,162,77,0.3)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#F1EEE6]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-full bg-[#0B0B0C] text-[#25D366] shrink-0">
                        <WhatsAppSolidIcon size={22} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#0B0B0C]">
                            Chat on WhatsApp
                          </span>
                        </div>
                        <p className="text-xs text-[#0B0B0C]/80 mt-0.5 font-medium">
                          Fastest way to reach me
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-[#0B0B0C] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#0B0B0C]/20 flex items-center justify-between font-mono text-sm sm:text-base font-bold tracking-wider text-[#0B0B0C]">
                    <span>{formatPhoneDisplay(settings.whatsappNumber)}</span>
                    <span className="text-xs uppercase tracking-widest font-semibold px-2 py-0.5 bg-[#0B0B0C]/10 rounded">
                      Instant Chat
                    </span>
                  </div>
                </a>
              </Reveal>
            )}

            {/* 2. Second Card: Call my Hotline */}
            {settings.hotline && (
              <Reveal delay={0.25} direction="up">
                <a
                  href={hotlineHref}
                  className="group block w-full p-5 bg-[#151517] border border-[rgba(241,238,230,0.15)] hover:border-[#C9A24D] hover:bg-[#1a1a1d] text-[#F1EEE6] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#C9A24D]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-full bg-[#0B0B0C] border border-[rgba(241,238,230,0.1)] text-[#C9A24D] shrink-0">
                        <Phone size={18} />
                      </div>
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-[#8A877F] block">
                          Call My Hotline
                        </span>
                        <span className="font-mono text-sm sm:text-base font-semibold text-[#F1EEE6] tracking-wider group-hover:text-[#C9A24D] transition-colors">
                          {formatPhoneDisplay(settings.hotline)}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-[#8A877F] group-hover:text-[#C9A24D] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </a>
              </Reveal>
            )}

            {/* 3. Direct Email & Details */}
            <Reveal delay={0.3} direction="up">
              <div className="p-5 bg-[#151517]/50 border border-[rgba(241,238,230,0.1)] space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-full bg-[#0B0B0C] border border-[rgba(241,238,230,0.1)] text-[#C9A24D] shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A877F] block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${settings.email}`}
                      className="font-sans font-medium text-sm sm:text-base text-[#F1EEE6] hover:text-[#C9A24D] transition-colors truncate block"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                {/* Optional Location if filled */}
                {settings.location && settings.location.trim().length > 0 && (
                  <div className="flex items-start gap-3.5 pt-2 border-t border-[rgba(241,238,230,0.06)]">
                    <div className="p-2 rounded-full bg-[#0B0B0C] border border-[rgba(241,238,230,0.1)] text-[#C9A24D] shrink-0 mt-0.5">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A877F] block">
                        Operating Base
                      </span>
                      <span className="font-mono text-xs sm:text-sm text-[#F1EEE6]">
                        {settings.location}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            {/* 4. Desktop Only QR Code */}
            {settings.whatsappNumber && qrCodeDataUrl && (
              <Reveal delay={0.35} direction="up">
                <div className="hidden lg:flex items-center gap-5 p-4 bg-[#151517] border border-[rgba(241,238,230,0.1)]">
                  <div className="p-2 bg-[#F1EEE6] rounded shrink-0 shadow">
                    <img
                      src={qrCodeDataUrl}
                      alt="WhatsApp QR Code"
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[#C9A24D] mb-1">
                      <QrCode size={14} />
                      <span className="font-mono text-[11px] uppercase tracking-widest font-bold">
                        Scan from Phone
                      </span>
                    </div>
                    <p className="text-xs text-[#8A877F] leading-relaxed">
                      Scan to chat from your phone directly on WhatsApp without typing the number.
                    </p>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Availability Status */}
            {settings.availabilityText && (
              <Reveal delay={0.4} direction="up">
                <div className="p-4 bg-[#151517] border border-[rgba(241,238,230,0.1)] flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#F1EEE6]">
                    {settings.availabilityText}
                  </span>
                </div>
              </Reveal>
            )}

            {/* 5. Connect Across Channels (Social Links) */}
            {/* Connect Across Channels */}
            <Reveal delay={0.45} direction="up">
              <div className="pt-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8A877F] block mb-3">
                  Connect Across Channels
                </span>
                <SocialLinksCluster variant="dock" iconSize={15.5} />
              </div>
            </Reveal>
          </div>

          {/* RIGHT 7 Columns: Form (Kept exactly as Stage 2) */}
          <div className="lg:col-span-7 bg-[#151517] border border-[rgba(241,238,230,0.15)] p-8 sm:p-12 shadow-2xl relative">
            {isSuccess ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[rgba(201,162,77,0.1)] border border-[#C9A24D] text-[#C9A24D] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-h2 font-bold text-[#F1EEE6]">
                  Message received.
                </h3>
                <p className="text-sm sm:text-base text-[#8A877F] max-w-md mx-auto leading-relaxed">
                  I'll get back to you soon. Thank you for presenting your project inquiry.
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSuccess(false)}
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot hidden input for bots */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formState.honeypot}
                  onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
                  className="hidden"
                  aria-hidden="true"
                />

                {errorMessage && (
                  <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2">
                    <ShieldAlert size={16} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* One-line Divider */}
                <div className="flex items-center gap-3 pb-2 border-b border-[rgba(241,238,230,0.08)]">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A24D] font-medium">
                    Or send a message here
                  </span>
                  <span className="h-px flex-1 bg-[rgba(241,238,230,0.08)]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs uppercase tracking-wider text-[#8A877F] mb-2"
                    >
                      Your Name <span className="text-[#C9A24D]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      maxLength={100}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className="w-full bg-[#0B0B0C] border border-[rgba(241,238,230,0.15)] focus:border-[#C9A24D] px-4 py-3 text-sm text-[#F1EEE6] placeholder-[#8A877F]/50 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs uppercase tracking-wider text-[#8A877F] mb-2"
                    >
                      Your Email <span className="text-[#C9A24D]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      maxLength={200}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. jane@company.com"
                      className="w-full bg-[#0B0B0C] border border-[rgba(241,238,230,0.15)] focus:border-[#C9A24D] px-4 py-3 text-sm text-[#F1EEE6] placeholder-[#8A877F]/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block font-mono text-xs uppercase tracking-wider text-[#8A877F] mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    maxLength={200}
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="e.g. AI Video Production Inquiry"
                    className="w-full bg-[#0B0B0C] border border-[rgba(241,238,230,0.15)] focus:border-[#C9A24D] px-4 py-3 text-sm text-[#F1EEE6] placeholder-[#8A877F]/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs uppercase tracking-wider text-[#8A877F] mb-2"
                  >
                    Project Scope & Brief <span className="text-[#C9A24D]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    maxLength={5000}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your brand, timeline, deliverables, and vision..."
                    className="w-full bg-[#0B0B0C] border border-[rgba(241,238,230,0.15)] focus:border-[#C9A24D] px-4 py-3 text-sm text-[#F1EEE6] placeholder-[#8A877F]/50 focus:outline-none transition-colors resize-y min-h-[120px]"
                  />
                  <div className="flex justify-between items-center mt-1 text-[11px] font-mono text-[#8A877F]">
                    <span>Minimum 10 characters</span>
                    <span>{formState.message.length} / 5000</span>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                    icon={<Send size={16} />}
                  >
                    {isSubmitting ? 'Transmitting...' : 'Send Inquiry'}
                  </Button>
                </div>
              </form>
            )}

            {/* Direct fallback note */}
            <div className="mt-8 pt-6 border-t border-[rgba(241,238,230,0.08)] flex flex-wrap items-center justify-between text-xs font-mono text-[#8A877F]">
              <span>Direct inquiries also welcome via email:</span>
              <a
                href={`mailto:${settings.email}`}
                className="text-[#C9A24D] hover:underline"
              >
                {settings.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
