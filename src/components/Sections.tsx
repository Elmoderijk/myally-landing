import React from 'react';
import { SignalDot, Button, ArrowIcon, AuroraMountainsBg, Frosted } from './Atoms';
import { Reveal, MagneticCard, ImageRevealLink, useScrollProgress, clamp, smooth, lerp } from './ScrollEffects';
import { CountUp } from './Polish';

interface Tweaks {
  accent: string;
  accentBright: string;
  ctaPrimary: string;
  [key: string]: any;
}

// ─── FeatureCard ─────────────────────────────────────────────────

const FeatureCard = ({ num, title, body, meta, accent }: { num: string; title: string; body: string; meta: string; accent: string }) => (
  <div style={{
    padding: '28px 24px', background: 'var(--bg-1)',
    border: '1px solid var(--line)', borderRadius: 8,
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>{num}</div>
    <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 10, lineHeight: 1.2 }}>{title}</h3>
    <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--fg-1)', marginBottom: 20 }}>{body}</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 16, borderTop: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 11, color: accent }}>
      <SignalDot color={accent} size={6} />{meta}
    </div>
  </div>
);

// ─── StatsBlock ──────────────────────────────────────────────────

export const StatsBlock = ({ tweaks }: { tweaks: Tweaks }) => (
  <section style={{ padding: '80px 80px', borderTop: '1px solid var(--line)', position: 'relative' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
      {[
        { value: 24,    suffix: '/7', label: 'altijd aan',       color: 'var(--lime)' },
        { value: 99.8,  suffix: '%',  label: 'uptime · 30d',     color: tweaks.accentBright, decimals: 1 },
        { value: 1400,  suffix: '+',  label: 'taken / maand',    color: 'var(--cyan)' },
        { value: 2.4,   suffix: 'm',  label: 'gem. responstijd', color: 'var(--lime)', decimals: 1 },
      ].map((s, i) => (
        <Reveal key={i} delay={i * 80}>
          <div style={{ padding: '28px 4px', borderTop: '1px solid var(--line-strong)' }}>
            <div style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1, color: s.color, marginBottom: 12 }}>
              <CountUp to={s.value} suffix={s.suffix} decimals={(s as any).decimals || 0} />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

// ─── FeaturesSection ─────────────────────────────────────────────

export const FeaturesSection = ({ tweaks }: { tweaks: Tweaks }) => (
  <section style={{ padding: '120px 80px', borderTop: '1px solid var(--line)', position: 'relative' }}>
    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginBottom: 64, gap: 40 }}>
      <Reveal>
        <div style={{ maxWidth: 560 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>01 · wat ally doet</div>
          <h2 style={{ fontSize: 48, lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 600 }}>
            Kijkt mee.<br /><span style={{ color: 'var(--fg-2)' }}>Denkt mee. Bouwt mee.</span>
          </h2>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-1)', maxWidth: 360 }}>
          Ally draait in jouw eigen omgeving — ze leert je processen kennen zoals een nieuwe collega dat zou doen, maar dan zonder koffiepauze.
        </p>
      </Reveal>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {[
        { num: '01', title: 'Ze kijkt mee',    body: 'Ally monitort je flows, je data en je team. Merkt afwijkingen op voordat jij ze ziet.', meta: '24/7 · realtime' },
        { num: '02', title: 'Ze praat met je', body: 'Geen dashboards vol grafieken. Ally zegt gewoon wat er speelt — en vraagt wat je wil doen.', meta: 'chat · nederlands' },
        { num: '03', title: 'Ze bouwt door',   body: 'Vraag om een nieuwe feature, Ally + het team zet het live. Jouw app groeit met je mee.', meta: 'requests · deploys' },
      ].map((f, i) => (
        <Reveal key={i} delay={i * 100}>
          <MagneticCard accent={tweaks.accent}>
            <FeatureCard {...f} accent={tweaks.accent} />
          </MagneticCard>
        </Reveal>
      ))}
    </div>
  </section>
);

// ─── HowItWorksSection ───────────────────────────────────────────

export const HowItWorksSection = ({ tweaks }: { tweaks: Tweaks }) => {
  const ref = React.useRef<HTMLElement>(null);
  const p = useScrollProgress(ref as React.RefObject<HTMLElement>);
  const draw = smooth(clamp((p - 0.2) / 0.5));

  const steps = [
    { num: '01', title: 'Setup',       body: 'Ally koppelt aan je tools — Slack, Stripe, je database. Je geeft toegang, zij leest mee.', meta: '10 min · setup' },
    { num: '02', title: 'Leren',       body: 'Een week meekijken zonder iets te raken. Ze leert je flows, je toon, je beslissingen.', meta: '~ 7 dagen · observe' },
    { num: '03', title: 'Mee draaien', body: 'Vanaf dag 8 doet Ally mee. Routine eerst, dan steeds meer. Jij houdt de regie.', meta: 'live · always on' },
  ];

  return (
    <section ref={ref} style={{ padding: '120px 80px', borderTop: '1px solid var(--line)', position: 'relative' }}>
      <Reveal>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>04 · hoe het werkt</div>
        <h2 style={{ fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 600, marginBottom: 80, maxWidth: 720 }}>
          Drie stappen.<br /><span style={{ color: 'var(--fg-2)' }}>Geen plan-spreadsheets.</span>
        </h2>
      </Reveal>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 36, left: '8%', right: '8%', height: 1, background: 'var(--line-strong)' }} />
        <div style={{
          position: 'absolute', top: 36, left: '8%',
          height: 1, width: `${draw * 84}%`,
          background: `linear-gradient(90deg, ${tweaks.accentBright}, ${tweaks.accent})`,
          boxShadow: `0 0 12px ${tweaks.accent}`,
          transition: 'width 80ms linear',
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
          {steps.map((s, i) => {
            const stepP = smooth(clamp((p - (0.25 + i * 0.12)) / 0.18));
            return (
              <div key={i} style={{ opacity: 0.3 + stepP * 0.7, transform: `translateY(${(1 - stepP) * 16}px)`, transition: 'opacity 200ms ease, transform 200ms ease' }}>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: 'var(--bg-0)', border: `2px solid ${tweaks.accentBright}`,
                  boxShadow: `0 0 0 4px var(--bg-0), 0 0 16px ${tweaks.accent}`,
                  marginBottom: 28, marginTop: 28,
                  transform: `scale(${0.5 + stepP * 0.5})`,
                  transition: 'transform 260ms cubic-bezier(0.2,0.8,0.2,1)',
                }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>{s.num}</div>
                <h3 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--fg-1)', marginBottom: 20, maxWidth: 360 }}>{s.body}</p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: tweaks.accentBright, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.meta}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── ShowcaseSection ─────────────────────────────────────────────

export const ShowcaseSection = ({ tweaks }: { tweaks: Tweaks }) => {
  const items = [
    { label: 'Operations',       sub: '01 · realtime',   swatch: `linear-gradient(135deg, ${tweaks.accent}, #378ADD)` },
    { label: 'Finance flow',     sub: '02 · automated',  swatch: `linear-gradient(135deg, #5DCAA5, ${tweaks.accent})` },
    { label: 'Customer signals', sub: '03 · monitoring', swatch: `linear-gradient(135deg, #22D3EE, ${tweaks.accentBright})` },
    { label: 'Build requests',   sub: '04 · deploys',    swatch: `linear-gradient(135deg, ${tweaks.accentBright}, #84CC16)` },
  ];
  return (
    <section style={{ padding: '120px 80px', borderTop: '1px solid var(--line)', position: 'relative' }}>
      <Reveal>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>03 · waar ze meedraait</div>
        <h2 style={{ fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 600, marginBottom: 64, maxWidth: 720 }}>
          Vier vlakken.<br /><span style={{ color: 'var(--fg-2)' }}>Eén collega.</span>
        </h2>
      </Reveal>
      <div style={{ borderBottom: '1px solid var(--line)' }}>
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 80}>
            <ImageRevealLink {...it} accent={tweaks.accentBright} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ─── ScrollTimeline (Use Cases) ───────────────────────────────────

const useCaseRows = [
  { code: 'invoice.flow', time: '09:42', tone: 'lime',   msg: '3 facturen > 2d in controle. Herinnering naar Sanne?' },
  { code: 'ally.detect',  time: '11:18', tone: 'violet', msg: 'Anomaly — 2 orders dezelfde BTW-nummer. Check?' },
  { code: 'team.sync',    time: '14:03', tone: 'cyan',   msg: 'Nieuwe aanvraag #0148 lijkt op #0133 — zelfde flow?' },
  { code: 'ops.deploy',   time: '17:21', tone: 'lime',   msg: 'v1.4.0 shipped · 2m 14s · groen' },
];

const rowDetails = [
  { story: 'Klant mailt over een orderwijziging buiten openingstijden. Ally checkt de voorraad, bevestigt levertijd en stuurt de update.', impact: '~12 min · 1 mail bespaard' },
  { story: "Tikt 14 facturen aan, matcht ze met PO's en boekt ze door. Twee uitzonderingen worden geflagd voor jouw review.", impact: '~45 min · 2 reviews open' },
  { story: 'Een terugkerende klant heeft een vraag. Ally herkent de history, antwoordt persoonlijk en logt het ticket weg.', impact: '~6 min · 1 ticket gesloten' },
  { story: 'Voorraadalert van leverancier. Ally herordert, update de planning en informeert het team.', impact: '~20 min · re-order live' },
];

export const ScrollTimeline = ({ tweaks }: { tweaks: Tweaks }) => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const p = useScrollProgress(sectionRef as React.RefObject<HTMLElement>);
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  const tp = smooth(clamp((p - 0.15) / 0.65));

  return (
    <section ref={sectionRef} style={{ padding: '120px 80px', borderTop: '1px solid var(--line)', background: 'var(--bg-1)', position: 'relative' }}>
      <Reveal>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>02 · een dag met ally</div>
        <h2 style={{ fontSize: 48, lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 600, marginBottom: 14, maxWidth: 720 }}>Dit komt er uit Ally.</h2>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--fg-1)', maxWidth: 540, marginBottom: 64 }}>
          Korte, directe berichten. De tijdlijn vult zichzelf terwijl je scrollt.
        </p>
      </Reveal>

      <div style={{ position: 'relative', paddingLeft: 60 }}>
        <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 1, background: 'var(--line-strong)' }} />
        <div style={{
          position: 'absolute', left: 24, top: 0, width: 1, height: `${tp * 100}%`,
          background: `linear-gradient(180deg, ${tweaks.accentBright}, ${tweaks.accent})`,
          boxShadow: `0 0 12px ${tweaks.accent}`,
          transition: 'height 80ms linear',
        }} />

        {useCaseRows.map((row, i) => {
          const rowStart = 0.05 + i * (0.85 / useCaseRows.length);
          const rowP = smooth(clamp((tp - rowStart) / 0.18));
          const toneColor = row.tone === 'lime' ? 'var(--lime)' : row.tone === 'violet' ? tweaks.accentBright : 'var(--cyan)';
          return (
            <div key={i} style={{
              position: 'relative', padding: '28px 0',
              borderBottom: i < useCaseRows.length - 1 ? '1px solid var(--line)' : 'none',
              opacity: 0.25 + rowP * 0.75,
              transform: `translateX(${lerp(20, 0, rowP)}px)`,
              transition: 'opacity 180ms ease, transform 180ms ease',
              cursor: 'pointer',
            }} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
              <div style={{
                position: 'absolute', left: -36, top: 36, marginLeft: -4,
                width: 8, height: 8, borderRadius: 8, background: toneColor,
                boxShadow: openIdx === i
                  ? `0 0 0 4px var(--bg-1), 0 0 0 8px ${toneColor}33, 0 0 24px ${toneColor}`
                  : `0 0 0 4px var(--bg-1), 0 0 12px ${toneColor}`,
                transform: `scale(${(0.4 + rowP * 0.6) * (openIdx === i ? 1.4 : 1)})`,
                transition: 'transform 220ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 220ms ease',
              }} />
              <div style={{ display: 'grid', gridTemplateColumns: '80px 180px 1fr auto auto', gap: 24, alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                <span style={{ color: 'var(--fg-3)' }}>{row.time}</span>
                <span style={{ color: toneColor }}>{row.code}</span>
                <span style={{ color: 'var(--fg-0)', fontFamily: 'var(--font-sans)', fontSize: 16, letterSpacing: '-0.005em' }}>{row.msg}</span>
                <span style={{ color: 'var(--fg-2)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>automated</span>
                <span style={{
                  width: 24, height: 24, borderRadius: 12,
                  border: `1px solid ${openIdx === i ? toneColor : 'var(--line-strong)'}`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: openIdx === i ? toneColor : 'var(--fg-2)',
                  transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 220ms cubic-bezier(0.2,0.8,0.2,1), color 220ms ease, border-color 220ms ease',
                  fontSize: 16, lineHeight: '1',
                }}>+</span>
              </div>
              {rowDetails[i] && (
                <div style={{
                  overflow: 'hidden',
                  maxHeight: openIdx === i ? 220 : 0, opacity: openIdx === i ? 1 : 0,
                  transition: 'max-height 360ms cubic-bezier(0.2,0.8,0.2,1), opacity 240ms ease, margin-top 360ms ease',
                  marginTop: openIdx === i ? 16 : 0,
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 180px 1fr', gap: 24 }}>
                    <div />
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: 4 }}>wat er gebeurde</div>
                    <div>
                      <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-1)', maxWidth: 600, marginBottom: 12 }}>{rowDetails[i].story}</p>
                      <div style={{
                        display: 'inline-block', padding: '6px 12px',
                        border: `1px solid ${toneColor}66`, borderRadius: 999,
                        fontFamily: 'var(--font-mono)', fontSize: 11, color: toneColor,
                        textTransform: 'uppercase', letterSpacing: '0.06em', background: `${toneColor}11`,
                      }}>{rowDetails[i].impact}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ─── ComparisonSection ───────────────────────────────────────────

export const ComparisonSection = ({ tweaks }: { tweaks: Tweaks }) => {
  const without = [
    'Status checken in 7 verschillende tools',
    'Maandagochtend alles opnieuw uitleggen',
    'Eerste die wakker wordt = eerste die fixt',
    '4 dashboards, geen overzicht',
    'Issues pas zien als ze al door de klant gemeld zijn',
  ];
  const withAlly = [
    'Eén briefing — wat speelt, wat moet jij beslissen',
    'Ally onthoudt context, ook van vorige week',
    'Nachtdienst geregeld, briefing klaar om 7:00',
    'Geen dashboards. Concrete vragen, ja/nee',
    'Anomaly detection draait 24/7 — proactief',
  ];

  return (
    <section style={{ padding: '120px 80px', borderTop: '1px solid var(--line)', position: 'relative' }}>
      <Reveal>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>05 · het verschil</div>
        <h2 style={{ fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 600, marginBottom: 64, maxWidth: 720 }}>
          Een dag zonder.<br /><span style={{ color: tweaks.accentBright }}>Een dag met Ally.</span>
        </h2>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Reveal>
          <div style={{ padding: 32, border: '1px solid var(--line)', borderRadius: 8, background: 'var(--bg-1)', opacity: 0.7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--fg-3)' }} />
              zonder Ally
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {without.map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.5, color: 'var(--fg-1)', paddingBottom: 16, borderBottom: i < without.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <span style={{ flexShrink: 0, marginTop: 6, width: 14, height: 1, background: 'var(--fg-3)' }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div style={{
            padding: 32, borderRadius: 8, background: `linear-gradient(180deg, ${tweaks.accent}10, transparent), var(--bg-1)`,
            border: `1px solid ${tweaks.accent}55`,
            boxShadow: `0 0 0 1px ${tweaks.accent}22, 0 30px 60px -20px ${tweaks.accent}44`,
            position: 'relative', overflow: 'hidden',
          }}>
            <div aria-hidden style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${tweaks.accent}33, transparent 70%)`, filter: 'blur(20px)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: 11, color: tweaks.accentBright, textTransform: 'uppercase', letterSpacing: '0.08em', position: 'relative' }}>
              <SignalDot color={tweaks.accentBright} />met Ally
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
              {withAlly.map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.5, color: 'var(--fg-0)', paddingBottom: 16, borderBottom: i < withAlly.length - 1 ? `1px solid ${tweaks.accent}22` : 'none' }}>
                  <span style={{ flexShrink: 0, marginTop: 6, width: 14, height: 1, background: tweaks.accentBright, boxShadow: `0 0 6px ${tweaks.accent}` }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ─── TestimonialSection ──────────────────────────────────────────

export const TestimonialSection = ({ tweaks }: { tweaks: Tweaks }) => (
  <section style={{ position: 'relative', minHeight: 460, borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', overflow: 'hidden' }}>
    <AuroraMountainsBg accent={tweaks.accent} accentBright={tweaks.accentBright} />
    <div style={{ position: 'relative', zIndex: 2, padding: '120px 80px', maxWidth: 980, margin: '0 auto' }}>
      <Reveal>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 32, textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>06 · in het wild</div>
        <blockquote style={{ margin: 0, padding: 0, fontSize: 40, lineHeight: 1.15, letterSpacing: '-0.025em', fontWeight: 500, color: 'var(--fg-0)', textShadow: '0 2px 30px rgba(0,0,0,0.7)', marginBottom: 40 }}>
          "We hebben Ally een week laten meekijken. Op dag acht had ze drie dingen door die ons al maanden ontgingen. Sindsdien zijn de maandagochtenden compleet anders."
        </blockquote>
      </Reveal>
      <Reveal delay={120}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${tweaks.accentBright}, ${tweaks.accent})`, border: '1px solid rgba(255,255,255,0.15)' }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--fg-0)', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>[ Naam · Rol ]</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>[ bedrijf · sector ]</div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─── FAQSection ──────────────────────────────────────────────────

const FAQItem = ({ q, a, defaultOpen = false, accent }: { q: string; a: string; defaultOpen?: boolean; accent: string }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  const innerRef = React.useRef<HTMLDivElement>(null);
  return (
    <div style={{ borderTop: '1px solid var(--line)' }}>
      <button data-cursor="hover" onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 4px', background: 'transparent', border: 'none', textAlign: 'left',
        fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em',
        color: open ? 'var(--fg-0)' : 'var(--fg-1)', cursor: 'pointer', transition: 'color 220ms ease',
      }}
        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-0)'}
        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = open ? 'var(--fg-0)' : 'var(--fg-1)'}
      >
        <span>{q}</span>
        <span style={{
          flexShrink: 0, width: 32, height: 32,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${open ? accent : 'var(--line-strong)'}`, borderRadius: '50%',
          color: open ? accent : 'var(--fg-1)',
          transform: `rotate(${open ? 45 : 0}deg)`,
          transition: 'transform 280ms cubic-bezier(0.2,0.8,0.2,1), border-color 220ms ease, color 220ms ease',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M6 1v10M1 6h10" />
          </svg>
        </span>
      </button>
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? (innerRef.current ? innerRef.current.scrollHeight : 200) : 0,
        opacity: open ? 1 : 0,
        transition: 'max-height 380ms cubic-bezier(0.2,0.8,0.2,1), opacity 280ms ease',
      }}>
        <div ref={innerRef} style={{ padding: '0 4px 24px', fontSize: 15, lineHeight: 1.6, color: 'var(--fg-1)', maxWidth: 720 }}>{a}</div>
      </div>
    </div>
  );
};

export const FAQSection = ({ tweaks }: { tweaks: Tweaks }) => {
  const items = [
    { q: "Heeft Ally toegang tot al m'n data?",  a: 'Alleen tot wat jij koppelt. Per tool kun je read-only of read-write toestaan, en alles is per actie te herroepen. Ally vraagt expliciet voordat ze schrijft naar systemen.' },
    { q: 'Hoe lang duurt de setup?',               a: 'Een eerste integratie is in ~10 minuten klaar. De leerfase duurt ongeveer een week — daarin kijkt Ally mee zonder iets te raken, zodat ze je flows leert kennen.' },
    { q: 'Werkt Ally in het Nederlands?',           a: 'Ja, Ally praat standaard Nederlands. Engels, Duits en Frans kunnen ook — handig als je team internationaal is.' },
    { q: 'Wat als Ally iets fout doet?',             a: 'Elke actie is reversibel en gelogd. Je kunt regels instellen waar Ally altijd eerst moet vragen — bijvoorbeeld bij betalingen boven een bedrag.' },
    { q: 'Hoeveel kost het?',                         a: 'Drie tiers: Basic, Premium en Scale. Zie de pricing-sectie hierboven, of neem contact op voor een tier op maat.' },
  ];
  return (
    <section style={{ padding: '120px 80px', borderTop: '1px solid var(--line)', position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'start' }}>
        <Reveal>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>07 · vragen</div>
          <h2 style={{ fontSize: 48, lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 600, marginBottom: 24 }}>
            Veelgestelde<br /><span style={{ color: 'var(--fg-2)' }}>vragen.</span>
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--fg-1)', maxWidth: 320 }}>
            Staat je vraag er niet bij? Plan een 15-min call, dan gaan we het er even over hebben.
          </p>
        </Reveal>
        <div>
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <FAQItem {...it} defaultOpen={i === 0} accent={tweaks.accentBright} />
            </Reveal>
          ))}
          <div style={{ borderTop: '1px solid var(--line)' }} />
        </div>
      </div>
    </section>
  );
};

// ─── PricingSection ──────────────────────────────────────────────

export const PricingSection = ({ tweaks }: { tweaks: Tweaks }) => {
  const [yearly, setYearly] = React.useState(true);
  const tiers = [
    { name: 'Basic',   tag: 'starter',      monthly: 49,  copy: 'Voor solo founders die rust willen in de inbox.',          features: ['1 integratie', 'Briefing 1×/dag', 'NL/EN', 'E-mail support'],                              featured: false },
    { name: 'Premium', tag: 'meest gekozen', monthly: 149, copy: 'Voor kleine teams. Ally draait mee in al je tools.',        features: ['Tot 6 integraties', 'Realtime monitoring', 'Anomaly detection', 'Slack + Discord', 'Priority support'], featured: true },
    { name: 'Scale',   tag: 'op maat',       monthly: 399, copy: 'Voor teams die Ally door alles laten meekijken.',          features: ['Onbeperkte integraties', 'Custom flows', 'Dedicated tier', 'SSO + audit logs', '24/7 SLA'],       featured: false },
  ];
  const price = (m: number) => yearly ? Math.round(m * 0.8) : m;

  return (
    <section style={{ padding: '120px 80px', borderTop: '1px solid var(--line)', position: 'relative' }}>
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>08 · pricing</div>
          <h2 style={{ fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 600, marginBottom: 16 }}>
            Kies een Ally.<br /><span style={{ color: 'var(--fg-2)' }}>Eén collega, drie maten.</span>
          </h2>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 999, padding: 4, position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 4, bottom: 4,
              left: yearly ? 'calc(50% + 0px)' : 4,
              width: 'calc(50% - 4px)',
              background: tweaks.accent, borderRadius: 999,
              boxShadow: `0 0 0 1px ${tweaks.accent}55, 0 0 16px ${tweaks.accent}55`,
              transition: 'left 320ms cubic-bezier(0.2,0.8,0.2,1)',
            }} />
            {[{ l: 'Maandelijks', v: false }, { l: 'Jaarlijks  −20%', v: true }].map((t, i) => (
              <button key={i} data-cursor="hover" onClick={() => setYearly(t.v)} style={{
                position: 'relative', padding: '10px 24px', background: 'transparent', border: 'none',
                color: yearly === t.v ? '#fff' : 'var(--fg-1)',
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                transition: 'color 220ms ease', letterSpacing: '-0.005em',
              }}>{t.l}</button>
            ))}
          </div>
        </div>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 100}>
            <div style={{
              padding: '36px 28px',
              border: tier.featured ? `1px solid ${tweaks.accent}66` : '1px solid var(--line)',
              borderRadius: 12, background: tier.featured ? `linear-gradient(180deg, ${tweaks.accent}10, transparent), var(--bg-1)` : 'var(--bg-1)',
              position: 'relative', overflow: 'hidden',
              boxShadow: tier.featured ? `0 0 0 1px ${tweaks.accent}22, 0 30px 60px -20px ${tweaks.accent}44` : 'none',
            }}>
              {tier.featured && (
                <div aria-hidden style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle, ${tweaks.accent}33, transparent 70%)`, filter: 'blur(20px)', pointerEvents: 'none' }} />
              )}
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>{tier.name}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: tier.featured ? tweaks.accentBright : 'var(--fg-2)',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    border: `1px solid ${tier.featured ? tweaks.accent + '55' : 'var(--line-strong)'}`,
                    padding: '3px 8px', borderRadius: 3,
                  }}>{tier.tag}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1 }}>€{price(tier.monthly)}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>/mnd</span>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-1)', marginBottom: 28, minHeight: 40 }}>{tier.copy}</p>
                <Button primary={tier.featured} icon={<ArrowIcon />} accent={tweaks.accent}>
                  {tier.featured ? 'Start met Ally' : 'Kies dit plan'}
                </Button>
                <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {tier.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: 'var(--fg-1)' }}>
                      <span style={{ width: 14, height: 1, background: tier.featured ? tweaks.accentBright : 'var(--fg-3)', flexShrink: 0 }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ─── BottomCTAScroll ─────────────────────────────────────────────

export const BottomCTAScroll = ({ tweaks }: { tweaks: Tweaks }) => {
  const ref = React.useRef<HTMLElement>(null);
  const p = useScrollProgress(ref as React.RefObject<HTMLElement>);
  const glow = smooth(clamp((p - 0.2) / 0.5));
  return (
    <section ref={ref} style={{ padding: '160px 80px', borderTop: '1px solid var(--line)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse ${50 + glow * 30}% ${70 + glow * 20}% at 50% 50%, ${tweaks.accent}${Math.round(15 + glow * 35).toString(16).padStart(2, '0')}, transparent 70%)`,
        pointerEvents: 'none', transition: 'background 200ms linear',
      }} />
      <Reveal>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontSize: 64, lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 600, marginBottom: 18 }}>
            Klaar om je <span style={{ color: tweaks.accentBright }}>Ally</span> te ontmoeten?
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--fg-1)', marginBottom: 32 }}>
            15 minuten call. We laten zien hoe Ally in jouw setup past.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Button primary icon={<ArrowIcon />} accent={tweaks.accent}>{tweaks.ctaPrimary}</Button>
            <Button>Bekijk pricing</Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

// ─── Footer ──────────────────────────────────────────────────────

import { AllyLogo } from './Atoms';

export const Footer = () => (
  <footer style={{
    padding: '40px 80px', borderTop: '1px solid var(--line)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)',
    textTransform: 'uppercase', letterSpacing: '0.06em',
  }}>
    <AllyLogo />
    <div style={{ display: 'flex', gap: 20 }}>
      <span>© 2026</span>
      <span>privacy</span>
      <span>terms</span>
      <span>support</span>
    </div>
  </footer>
);
