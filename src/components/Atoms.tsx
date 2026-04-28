import React from 'react';

// ─── SignalDot ────────────────────────────────────────────────────

export const SignalDot = ({ color = 'var(--violet)', size = 8 }: { color?: string; size?: number }) => (
  <span style={{
    display: 'inline-block', width: size, height: size,
    background: color, borderRadius: 2,
    boxShadow: `0 0 8px ${color}`, verticalAlign: 'middle',
    flexShrink: 0,
  }} />
);

// ─── Pill ────────────────────────────────────────────────────────

type PillTone = 'violet' | 'cyan' | 'lime' | 'neutral';
export const Pill = ({ children, tone = 'neutral', mono = false }: { children: React.ReactNode; tone?: PillTone; mono?: boolean }) => {
  const tones: Record<PillTone, { bg: string; fg: string; border: string }> = {
    violet: { bg: 'rgba(139,92,246,0.12)', fg: 'var(--violet-bright)', border: 'rgba(139,92,246,0.28)' },
    cyan:   { bg: 'rgba(34,211,238,0.10)', fg: 'var(--cyan)',           border: 'rgba(34,211,238,0.25)' },
    lime:   { bg: 'rgba(132,204,22,0.10)', fg: 'var(--lime)',           border: 'rgba(132,204,22,0.28)' },
    neutral:{ bg: 'var(--bg-2)',            fg: 'var(--fg-1)',           border: 'var(--line-strong)' },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', background: t.bg, color: t.fg,
      border: `1px solid ${t.border}`, borderRadius: 3,
      fontSize: 11,
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      letterSpacing: mono ? '0.02em' : '0',
      textTransform: mono ? 'uppercase' : 'none',
      fontWeight: 500, lineHeight: 1, whiteSpace: 'nowrap',
    }}>{children}</span>
  );
};

// ─── ArrowIcon ───────────────────────────────────────────────────

export const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

// ─── Button ──────────────────────────────────────────────────────

export const MagneticButton = ({ children, strength = 0.3, style = {}, ...rest }: { children: React.ReactNode; strength?: number; style?: React.CSSProperties; [key: string]: any }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [t, setT] = React.useState({ x: 0, y: 0 });
  return (
    <span
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        setT({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{
        display: 'inline-block',
        transform: `translate(${t.x}px, ${t.y}px)`,
        transition: 'transform 280ms cubic-bezier(0.2,0.8,0.2,1)',
        willChange: 'transform',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
};

export const Button = ({ children, primary = false, icon = null, onClick, accent = '#8B5CF6' }: {
  children: React.ReactNode;
  primary?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  accent?: string;
}) => {
  const btn = (
    <button
      onClick={onClick}
      data-cursor="hover"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '12px 20px',
        background: primary ? accent : 'transparent',
        color: primary ? '#fff' : 'var(--fg-0)',
        border: primary ? 'none' : '1px solid var(--line-strong)',
        borderRadius: 5, fontSize: 14,
        fontFamily: 'var(--font-sans)', fontWeight: 500,
        cursor: 'pointer',
        boxShadow: primary ? `0 0 0 1px ${accent}55, 0 0 18px ${accent}47` : 'none',
        transition: 'all 180ms var(--ease)',
        letterSpacing: '-0.005em',
      }}
      onMouseEnter={(e) => {
        if (!primary) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-2)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = primary ? accent : 'transparent';
      }}
    >
      {children}
      {icon}
    </button>
  );
  if (primary) return <MagneticButton strength={0.25}>{btn}</MagneticButton>;
  return btn;
};

// ─── AllyLogoMark ────────────────────────────────────────────────

export const AllyLogoMark = ({ size = 26, id = 'ally-logo-grad' }: { size?: number; id?: string }) => (
  <svg width={size} height={size} viewBox="0 0 92 92" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#378ADD"/>
        <stop offset="100%" stopColor="#9d96f0"/>
      </linearGradient>
    </defs>
    <path
      d="M 26 68 L 46 22 L 66 68 L 56 45 L 46 57 L 36 45 Z"
      fill="none"
      stroke={`url(#${id})`}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AllyLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <AllyLogoMark size={26} id="ally-logo-nav" />
    <span style={{
      fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15,
      letterSpacing: '-0.01em',
    }}>My Ally<span style={{ color: 'var(--violet-bright)' }}>.</span></span>
  </div>
);

// ─── GridBg ──────────────────────────────────────────────────────

export const GridBg = () => (
  <div aria-hidden style={{
    position: 'absolute', inset: 0,
    backgroundImage: 'var(--grid-bg)',
    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 85%)',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 85%)',
    pointerEvents: 'none',
  }} />
);

// ─── Frosted ─────────────────────────────────────────────────────

export const Frosted = ({ children, style = {}, intensity = 20, tint = 'rgba(16,16,20,0.45)', border = 'rgba(255,255,255,0.08)' }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  intensity?: number;
  tint?: string;
  border?: string;
}) => (
  <div style={{
    background: tint,
    backdropFilter: `blur(${intensity}px) saturate(160%)`,
    WebkitBackdropFilter: `blur(${intensity}px) saturate(160%)`,
    border: `1px solid ${border}`,
    borderRadius: 12,
    boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 60px rgba(0,0,0,0.35)',
    ...style,
  }}>{children}</div>
);

// ─── AuroraMountainsBg ───────────────────────────────────────────

import mountainsNight from '../assets/mountains-night.jpg';

export const AuroraMountainsBg = ({ accent = '#8B5CF6', accentBright = '#A78BFA' }: { accent?: string; accentBright?: string }) => (
  <div aria-hidden style={{
    position: 'absolute', inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  }}>
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `url(${mountainsNight})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
      filter: 'saturate(0.85) brightness(0.95)',
    }} />

    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: 0.55 }} preserveAspectRatio="none" viewBox="0 0 1280 900">
      <defs>
        <linearGradient id="aurora1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={accent}        stopOpacity="0"/>
          <stop offset="30%"  stopColor={accentBright}  stopOpacity="0.35"/>
          <stop offset="60%"  stopColor="#5DCAA5"       stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#378ADD"       stopOpacity="0"/>
        </linearGradient>
        <filter id="aurora-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="30"/>
        </filter>
      </defs>
      <path
        d="M -50 220 C 200 140, 400 300, 700 200 S 1100 140, 1350 260 L 1350 340 C 1100 240, 900 380, 700 280 S 200 240, -50 320 Z"
        fill="url(#aurora1)"
        filter="url(#aurora-blur)"
      />
    </svg>

    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(6,6,10,0.55) 85%, rgba(6,6,10,0.85) 100%)',
    }} />
    <div style={{
      position: 'absolute', left: 0, right: 0, top: 0, height: '20%',
      background: 'linear-gradient(180deg, var(--bg-0), transparent)',
    }} />
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: '25%',
      background: 'linear-gradient(180deg, transparent, var(--bg-0) 95%)',
    }} />
  </div>
);
