import React from 'react';

// ─── Hooks ────────────────────────────────────────────────────────

export const useScrollProgress = (ref: React.RefObject<HTMLElement | null>) => {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = vh + r.height;
      const passed = vh - r.top;
      const x = Math.max(0, Math.min(1, passed / total));
      setP(x);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);
  return p;
};

export const usePinnedProgress = (spacerRef: React.RefObject<HTMLElement | null>) => {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const el = spacerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = r.height - vh;
      if (scrollable <= 0) { setP(0); return; }
      const passed = -r.top;
      const x = Math.max(0, Math.min(1, passed / scrollable));
      setP(x);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [spacerRef]);
  return p;
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const smooth = (t: number) => t * t * (3 - 2 * t);

// ─── Reveal ──────────────────────────────────────────────────────

export const Reveal = ({ children, delay = 0, y = 24, duration = 700, threshold = 0.15, style = {} }: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  threshold?: number;
  style?: React.CSSProperties;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity ${duration}ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms`,
      willChange: 'opacity, transform',
      ...style,
    }}>{children}</div>
  );
};

// ─── MagneticCard ────────────────────────────────────────────────

export const MagneticCard = ({ children, accent }: { children: React.ReactNode; accent: string }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [t, setT] = React.useState({ x: 0, y: 0, mx: 50, my: 50, hover: false });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        setT({ x: (px - 0.5) * 6, y: (py - 0.5) * 6, mx: px * 100, my: py * 100, hover: true });
      }}
      onMouseLeave={() => setT(s => ({ ...s, x: 0, y: 0, hover: false }))}
      style={{
        position: 'relative',
        transform: `perspective(800px) rotateX(${-t.y * 0.6}deg) rotateY(${t.x * 0.6}deg) translateY(${t.hover ? -4 : 0}px)`,
        transition: t.hover ? 'transform 80ms linear' : 'transform 400ms cubic-bezier(0.2,0.8,0.2,1)',
        willChange: 'transform',
      }}
    >
      <div aria-hidden style={{
        position: 'absolute', inset: 0, borderRadius: 8,
        background: `radial-gradient(220px circle at ${t.mx}% ${t.my}%, ${accent}33, transparent 60%)`,
        opacity: t.hover ? 1 : 0, transition: 'opacity 220ms ease',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0, borderRadius: 8,
        boxShadow: t.hover ? `inset 0 0 0 1px ${accent}66, 0 24px 60px -20px ${accent}55` : 'none',
        transition: 'box-shadow 260ms ease', pointerEvents: 'none', zIndex: 2,
      }} />
      <div style={{ position: 'relative', zIndex: 0 }}>{children}</div>
    </div>
  );
};

// ─── ImageRevealLink ─────────────────────────────────────────────

export const ImageRevealLink = ({ label, sub, swatch, accent }: { label: string; sub: string; swatch: string; accent: string }) => {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [hover, setHover] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={(e) => {
        const r = wrapRef.current!.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      style={{
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '28px 4px', borderTop: '1px solid var(--line)', cursor: 'pointer', overflow: 'visible',
      }}
    >
      <h3 style={{
        fontSize: 36, letterSpacing: '-0.025em', fontWeight: 500,
        color: hover ? 'var(--fg-0)' : 'var(--fg-1)',
        transform: `translateX(${hover ? 12 : 0}px)`,
        transition: 'transform 360ms cubic-bezier(0.2,0.8,0.2,1), color 220ms ease',
        margin: 0,
      }}>{label}</h3>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>
        <span>{sub}</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          color: hover ? accent : 'var(--fg-2)',
          transform: `translateX(${hover ? 4 : 0}px)`,
          transition: 'transform 320ms ease, color 220ms ease',
        }}>
          <span style={{ width: 18, height: 1, background: 'currentColor' }}/>→
        </span>
      </div>
      <div aria-hidden style={{
        position: 'absolute', left: pos.x, top: pos.y,
        width: 220, height: 140, marginLeft: -110, marginTop: -70,
        borderRadius: 6, overflow: 'hidden', pointerEvents: 'none',
        opacity: hover ? 1 : 0,
        transform: `scale(${hover ? 1 : 0.85}) rotate(${hover ? -2 : 0}deg)`,
        transition: 'opacity 240ms ease, transform 360ms cubic-bezier(0.2,0.8,0.2,1)',
        boxShadow: '0 30px 60px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
        zIndex: 5,
      }}>
        <div style={{ position: 'absolute', inset: 0, background: swatch }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 14px)',
        }} />
        <div style={{
          position: 'absolute', left: 12, bottom: 10,
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>{label.toLowerCase()}.preview</div>
      </div>
    </div>
  );
};

// ─── ScrollProgressBar ───────────────────────────────────────────

export const ScrollProgressBar = ({ accent }: { accent: string }) => {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 100, pointerEvents: 'none' }}>
      <div style={{
        height: '100%', width: `${p * 100}%`,
        background: `linear-gradient(90deg, ${accent}, #fff)`,
        boxShadow: `0 0 12px ${accent}`,
      }} />
    </div>
  );
};
