import React from 'react';
import allyImg from '../assets/ally.png';

interface AllyAvatarProps {
  size?: number;
  loopSeconds?: number;
  showGlow?: boolean;
  glowColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const EyeLid = ({ pct, loopSeconds }: { pct: { left: number; top: number; width: number; height: number }; loopSeconds: number }) => {
  const scale = 1.18;
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: `${pct.left}%`,
        top: `${pct.top}%`,
        width: `${pct.width * scale}%`,
        height: `${pct.height * scale}%`,
        transform: 'translate(-50%, -50%) scaleY(0)',
        transformOrigin: 'center',
        background: 'radial-gradient(ellipse at 30% 25%, #1a1a1f 0%, #0a0a0c 60%, #050507 100%)',
        borderRadius: '50%',
        animation: `ally-blink ${loopSeconds}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
        boxShadow: 'inset 0 0 4px rgba(0,0,0,0.5)',
        willChange: 'transform',
      }}
    />
  );
};

export const AllyAvatar: React.FC<AllyAvatarProps> = ({
  size = 520,
  loopSeconds = 6,
  showGlow = true,
  glowColor = 'violet',
  className = '',
  style = {},
}) => {
  const imgW = 912;
  const imgH = 1183;

  const LEFT = { cx: 405, cy: 210, rx: 32, ry: 34 };
  const RIGHT = { cx: 517, cy: 211, rx: 32, ry: 34 };

  const eyePct = (e: typeof LEFT) => ({
    left: (e.cx / imgW) * 100,
    top: (e.cy / imgH) * 100,
    width: ((e.rx * 2) / imgW) * 100,
    height: ((e.ry * 2) / imgH) * 100,
  });

  const lp = eyePct(LEFT);
  const rp = eyePct(RIGHT);

  const aspect = imgW / imgH;
  const width = size;
  const height = size / aspect;

  const glowCss = glowColor === 'violet'
    ? 'radial-gradient(ellipse 55% 45% at 50% 42%, rgba(139,92,246,0.22), rgba(139,92,246,0.08) 35%, transparent 70%)'
    : 'radial-gradient(ellipse 55% 45% at 50% 42%, rgba(34,211,238,0.18), rgba(34,211,238,0.06) 35%, transparent 70%)';

  return (
    <div
      className={`ally-avatar ${className}`}
      style={{ position: 'relative', width, height, ...style }}
    >
      {showGlow && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-15% -10% -5% -10%',
            background: glowCss,
            filter: 'blur(8px)',
            pointerEvents: 'none',
            animation: `ally-glow-pulse ${loopSeconds}s ease-in-out infinite`,
          }}
        />
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: '50% 85%',
          animation: `ally-breathe ${loopSeconds}s ease-in-out infinite`,
          willChange: 'transform',
        }}
      >
        <img
          src={allyImg}
          alt="Ally"
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            userSelect: 'none',
            filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.5))',
          }}
        />
        <EyeLid pct={lp} loopSeconds={loopSeconds} />
        <EyeLid pct={rp} loopSeconds={loopSeconds} />
      </div>

      <style>{`
        @keyframes ally-breathe {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-4px) rotate(-0.5deg); }
          50% { transform: translateY(-2px) rotate(0.6deg); }
          75% { transform: translateY(-5px) rotate(-0.2deg); }
        }
        @keyframes ally-glow-pulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes ally-blink {
          0%, 37%, 43%, 82%, 87%, 100% { transform: translate(-50%, -50%) scaleY(0); }
          39%, 41% { transform: translate(-50%, -50%) scaleY(1); }
          84%, 85.5% { transform: translate(-50%, -50%) scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ally-avatar *, .ally-avatar { animation: none !important; }
        }
      `}</style>
    </div>
  );
};
