import React from 'react';

// ─── useInView ────────────────────────────────────────────────────

export const useInView = (ref: React.RefObject<HTMLElement | null>, threshold = 0.3) => {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return seen;
};

// ─── CustomCursor ────────────────────────────────────────────────

export const CustomCursor = ({ accent = '#A78BFA' }: { accent?: string }) => {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const stateRef = React.useRef({
    x: -100, y: -100, rx: -100, ry: -100,
    mode: 'default' as 'default' | 'hover' | 'text',
    visible: false,
    down: false,
  });

  React.useEffect(() => {
    let raf: number;
    const onMove = (e: MouseEvent) => {
      const s = stateRef.current;
      s.x = e.clientX; s.y = e.clientY; s.visible = true;
      const target = (e.target as Element).closest('[data-cursor]');
      s.mode = target ? (target.getAttribute('data-cursor') as 'default' | 'hover' | 'text') : 'default';
      if (!target) {
        const tag = (e.target as Element).tagName;
        if (tag === 'A' || tag === 'BUTTON' || (e.target as Element).closest('a,button,[role="button"]')) {
          s.mode = 'hover';
        }
      }
    };
    const onLeave = () => { stateRef.current.visible = false; };
    const onDown = () => { stateRef.current.down = true; };
    const onUp = () => { stateRef.current.down = false; };

    const tick = () => {
      const s = stateRef.current;
      s.rx += (s.x - s.rx) * 0.18;
      s.ry += (s.y - s.ry) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.x - 3}px, ${s.y - 3}px, 0)`;
        dotRef.current.style.opacity = s.visible ? '1' : '0';
      }
      if (ringRef.current) {
        let size = 30;
        if (s.mode === 'hover') size = 56;
        if (s.mode === 'text')  size = 22;
        const scale = s.down ? 0.85 : 1;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.transform = `translate3d(${s.rx - size / 2}px, ${s.ry - size / 2}px, 0) scale(${scale})`;
        ringRef.current.style.opacity = s.visible ? (s.mode === 'hover' ? '1' : '0.7') : '0';
        ringRef.current.style.borderColor = s.mode === 'hover' ? accent : 'rgba(255,255,255,0.6)';
        ringRef.current.style.background = s.mode === 'hover' ? `${accent}1A` : 'transparent';
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
    };
  }, [accent]);

  const [touch, setTouch] = React.useState(false);
  React.useEffect(() => {
    const handle = () => setTouch(true);
    window.addEventListener('touchstart', handle, { once: true });
    return () => window.removeEventListener('touchstart', handle);
  }, []);
  if (touch) return null;

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          html, body, * { cursor: none !important; }
        }
      `}</style>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 6, height: 6, borderRadius: '50%',
        background: '#fff', pointerEvents: 'none', zIndex: 9999,
        mixBlendMode: 'difference', transition: 'opacity 200ms ease',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 30, height: 30, borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.6)',
        pointerEvents: 'none', zIndex: 9998,
        transition: 'width 220ms cubic-bezier(0.2,0.8,0.2,1), height 220ms cubic-bezier(0.2,0.8,0.2,1), background 220ms ease, border-color 220ms ease, opacity 200ms ease',
      }} />
    </>
  );
};

// ─── GrainOverlay ────────────────────────────────────────────────

export const GrainOverlay = ({ opacity = 0.04 }: { opacity?: number }) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
      <feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>`;
  const url = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  return (
    <div aria-hidden style={{
      position: 'fixed', inset: 0,
      backgroundImage: url, backgroundSize: '160px 160px',
      opacity, pointerEvents: 'none', zIndex: 9000, mixBlendMode: 'overlay',
    }} />
  );
};

// ─── CountUp ─────────────────────────────────────────────────────

export const CountUp = ({ to, suffix = '', prefix = '', duration = 1400, decimals = 0 }: {
  to: number; suffix?: string; prefix?: string; duration?: number; decimals?: number;
}) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const seen = useInView(ref as React.RefObject<HTMLElement>, 0.4);
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(to * e);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);
  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString('nl-NL');
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};
