import React from 'react';
import { AllyAvatar } from './AllyAvatar';
import { SignalDot, Button, ArrowIcon, GridBg, AuroraMountainsBg, Frosted } from './Atoms';
import { usePinnedProgress, lerp, clamp, smooth } from './ScrollEffects';

interface Tweaks {
  headlineA: string;
  headlineB: string;
  headlineC: string;
  subcopy: string;
  ctaPrimary: string;
  ctaSecondary: string;
  accent: string;
  accentBright: string;
  mirror: boolean;
  allySize: number;
  loopSeconds: number;
  showGlow: boolean;
  glowTone: string;
}

// Stars component
const Stars = ({ opacity, progress, accent }: { opacity: number; progress: number; accent: string }) => {
  const stars = React.useMemo(() => {
    const out: { x: number; y: number; s: number; depth: number; a: number }[] = [];
    let seed = 11;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = 0; i < 90; i++) {
      out.push({ x: rand() * 100, y: rand() * 70, s: rand() * 1.6 + 0.4, depth: rand(), a: rand() * 0.7 + 0.2 });
    }
    return out;
  }, []);
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: opacity * 0.9, pointerEvents: 'none' }}>
      {stars.map((st, i) => (
        <span key={i} style={{
          position: 'absolute', left: `${st.x}%`, top: `${st.y}%`,
          width: st.s, height: st.s,
          background: i % 11 === 0 ? accent : '#fff',
          borderRadius: '50%', opacity: st.a,
          transform: `translateY(${(progress - 0.5) * (40 + st.depth * 60)}px)`,
          boxShadow: i % 11 === 0 ? `0 0 6px ${accent}` : '0 0 2px rgba(255,255,255,0.6)',
        }} />
      ))}
    </div>
  );
};

// Hero content with cascade reveal
const HeroContent = ({ tweaks }: { tweaks: Tweaks }) => {
  const t = tweaks;
  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 850),
      setTimeout(() => setPhase(4), 1300),
      setTimeout(() => setPhase(5), 1700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const fadeUp = (active: boolean): React.CSSProperties => ({
    opacity: active ? 1 : 0,
    transform: active ? 'translateY(0)' : 'translateY(16px)',
    transition: 'opacity 700ms cubic-bezier(0.2,0.8,0.2,1), transform 700ms cubic-bezier(0.2,0.8,0.2,1)',
  });

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
      padding: '60px 80px 80px', alignItems: 'center', position: 'relative',
    }}>
      <div style={{ maxWidth: 520, gridColumn: t.mirror ? 2 : 1, gridRow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, ...fadeUp(phase >= 1) }}>
          <SignalDot color={t.accent} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            ally.v1 · ready
          </span>
        </div>

        <h1 style={{ fontSize: 64, lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 600, marginBottom: 20 }}>
          <span style={{ display: 'inline-block', ...fadeUp(phase >= 2) }}>{t.headlineA}.</span>
          <br />
          <span style={{ display: 'inline-block', ...fadeUp(phase >= 3) }}>
            <span style={{ color: 'var(--fg-2)' }}>{t.headlineB} </span>
            <span style={{ color: t.accentBright, position: 'relative' }}>
              {t.headlineC}
              <span style={{
                position: 'absolute', bottom: -2, left: 0, right: 0,
                height: 2, background: t.accent, boxShadow: `0 0 12px ${t.accent}`,
                transformOrigin: 'left',
                transform: phase >= 3 ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 800ms cubic-bezier(0.2,0.8,0.2,1) 250ms',
              }} />
            </span>
            <span style={{ color: 'var(--fg-2)' }}>.</span>
          </span>
        </h1>

        <p style={{
          fontSize: 17, lineHeight: 1.55, color: 'var(--fg-1)',
          marginBottom: 32, maxWidth: 480,
          ...fadeUp(phase >= 4),
        }}>{t.subcopy}</p>

        <div style={{ display: 'flex', gap: 12, ...fadeUp(phase >= 5) }}>
          <Button primary icon={<ArrowIcon />} accent={t.accent}>{t.ctaPrimary}</Button>
          <Button>{t.ctaSecondary}</Button>
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative',
        gridColumn: t.mirror ? 1 : 2, gridRow: 1,
      }}>
        <AllyAvatar size={t.allySize} loopSeconds={t.loopSeconds} glowColor={t.glowTone} showGlow={t.showGlow} />
      </div>
    </div>
  );
};

// Pinned hero with scroll-driven aurora reveal
export const PinnedHeroAurora = ({ tweaks }: { tweaks: Tweaks }) => {
  const spacerRef = React.useRef<HTMLDivElement>(null);
  const p = usePinnedProgress(spacerRef as React.RefObject<HTMLElement>);

  const heroOut = smooth(clamp((p - 0.00) / 0.28));
  const mountainsIn = smooth(clamp((p - 0.18) / 0.50));
  const copyIn = smooth(clamp((p - 0.62) / 0.32));

  return (
    <div ref={spacerRef} data-section="hero" style={{ position: 'relative', height: '340vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Grid background fades out as mountains take over */}
        <div style={{ position: 'absolute', inset: 0, opacity: 1 - mountainsIn * 0.85 }}>
          <GridBg />
        </div>

        {/* Mountains + aurora slides in */}
        <div style={{
          position: 'absolute', inset: 0, opacity: mountainsIn,
          transform: `translateY(${lerp(60, 0, mountainsIn)}px) scale(${lerp(1.08, 1.0, mountainsIn)})`,
          transformOrigin: 'center 70%',
        }}>
          <AuroraMountainsBg accent={tweaks.accent} accentBright={tweaks.accentBright} />
        </div>

        {/* Stars parallax */}
        <Stars opacity={mountainsIn} progress={p} accent={tweaks.accentBright} />

        {/* Hero content fades out */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: 1 - heroOut,
          transform: `translateY(${lerp(0, -80, heroOut)}px)`,
          pointerEvents: heroOut > 0.6 ? 'none' : 'auto',
        }}>
          <HeroContent tweaks={tweaks} />
        </div>

        {/* "Altijd aan / Nooit moe" overlay copy + frosted cards */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 32,
          padding: '120px 80px', alignItems: 'center',
          pointerEvents: copyIn > 0.5 ? 'auto' : 'none',
        }}>
          <div style={{ opacity: copyIn, transform: `translateY(${lerp(40, 0, copyIn)}px)` }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16,
            }}>waarom my ally</div>
            <h2 style={{
              fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.035em',
              fontWeight: 600, marginBottom: 16, textShadow: '0 2px 30px rgba(0,0,0,0.7)',
            }}>
              Altijd aan.<br />
              <span style={{ color: 'var(--fg-2)' }}>Nooit moe.</span>
            </h2>
            <p style={{
              fontSize: 17, lineHeight: 1.55, color: 'var(--fg-1)', maxWidth: 460,
              textShadow: '0 2px 20px rgba(0,0,0,0.7)',
            }}>
              Terwijl jij slaapt, draait Ally door. Check 's ochtends gewoon wat er afgehandeld is.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { color: 'var(--lime)',         label: '03:42 · nachtdienst',       msg: '14 orders verwerkt. 2 flagged voor review.' },
              { color: tweaks.accentBright,   label: '07:15 · stand-up briefing', msg: '3 dingen voor vandaag. Rest is klaar.' },
              { color: 'var(--cyan)',         label: 'uptime · 30d',               msg: '99.8% · nooit een nacht gemist' },
            ].map((card, i) => {
              const cardP = smooth(clamp((p - (0.55 + i * 0.06)) / 0.30));
              return (
                <div key={i} style={{ opacity: cardP, transform: `translateY(${lerp(28, 0, cardP)}px)` }}>
                  <Frosted style={{ padding: '20px 22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <SignalDot color={card.color} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {card.label}
                      </span>
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--fg-0)', lineHeight: 1.45 }}>{card.msg}</div>
                  </Frosted>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom fade */}
        <div aria-hidden style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: '20%',
          background: 'linear-gradient(180deg, transparent, var(--bg-0) 95%)',
          pointerEvents: 'none',
        }} />

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', left: '50%', bottom: 28,
          transform: 'translateX(-50%)',
          opacity: clamp(1 - p * 4),
          fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-2)',
          textTransform: 'uppercase', letterSpacing: '0.16em',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          pointerEvents: 'none',
        }}>
          scroll
          <span style={{
            display: 'block', width: 1, height: 28,
            background: 'linear-gradient(180deg, var(--fg-2), transparent)',
            animation: 'scrollPulse 1.8s ease-in-out infinite',
          }} />
        </div>
      </div>
    </div>
  );
};
