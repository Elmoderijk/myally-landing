import React from 'react';
import { StickyFrostedNav } from './components/Nav';
import { PinnedHeroAurora } from './components/HeroSection';
import {
  StatsBlock,
  FeaturesSection,
  HowItWorksSection,
  ShowcaseSection,
  ScrollTimeline,
  ComparisonSection,
  TestimonialSection,
  FAQSection,
  PricingSection,
  BottomCTAScroll,
  Footer,
} from './components/Sections';
import { ScrollProgressBar } from './components/ScrollEffects';
import { CustomCursor, GrainOverlay } from './components/Polish';
import { CommandPalette } from './components/CommandPalette';

const TWEAKS = {
  headlineA: 'My Ally',
  headlineB: 'Your',
  headlineC: 'solution',
  subcopy: 'Jouw eigen AI-agent in jouw eigen app. Ze kent je processen, ziet waar het misgaat, en bouwt met jou mee. Niet nog een chatbot — een collega met een robotisch randje.',
  ctaPrimary: "Let's meet",
  ctaSecondary: 'Bekijk demo',
  accent: '#8B5CF6',
  accentBright: '#A78BFA',
  mirror: false,
  allySize: 440,
  loopSeconds: 6,
  showGlow: true,
  glowTone: 'violet',
};

export default function App() {
  return (
    <>
      {/* Polish layer */}
      <CustomCursor accent={TWEAKS.accentBright} />
      <GrainOverlay opacity={0.05} />
      <CommandPalette accent={TWEAKS.accentBright} />

      {/* Page */}
      <div style={{
        width: '100%',
        background: 'var(--bg-0)',
        color: 'var(--fg-0)',
        fontFamily: 'var(--font-sans)',
      }}>
        <ScrollProgressBar accent={TWEAKS.accent} />
        <StickyFrostedNav accent={TWEAKS.accent} />

        {/* Pinned hero → aurora reveal */}
        <PinnedHeroAurora tweaks={TWEAKS} />

        {/* Stats counters */}
        <StatsBlock tweaks={TWEAKS} />

        {/* Features with magnetic hover */}
        <FeaturesSection tweaks={TWEAKS} />

        {/* Hoe het werkt — 3 stappen */}
        <HowItWorksSection tweaks={TWEAKS} />

        {/* Showcase with image-reveal links */}
        <ShowcaseSection tweaks={TWEAKS} />

        {/* Scroll-drawn timeline */}
        <ScrollTimeline tweaks={TWEAKS} />

        {/* Comparison */}
        <ComparisonSection tweaks={TWEAKS} />

        {/* Testimonial over aurora */}
        <TestimonialSection tweaks={TWEAKS} />

        {/* FAQ */}
        <FAQSection tweaks={TWEAKS} />

        {/* Pricing */}
        <PricingSection tweaks={TWEAKS} />

        {/* Bottom CTA + footer */}
        <BottomCTAScroll tweaks={TWEAKS} />
        <Footer />
      </div>
    </>
  );
}
