import React from 'react';
import { AllyLogo, Button, ArrowIcon } from './Atoms';

export const StickyFrostedNav = ({ accent }: { accent: string }) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      background: scrolled ? 'rgba(10,10,12,0.55)' : 'transparent',
      backdropFilter: scrolled ? 'blur(22px) saturate(160%)' : 'blur(0px)',
      WebkitBackdropFilter: scrolled ? 'blur(22px) saturate(160%)' : 'blur(0px)',
      transition: 'background 300ms var(--ease), border-color 300ms var(--ease)',
    }}>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 80px',
        maxWidth: 1280, margin: '0 auto',
      }}>
        <AllyLogo />
        <div style={{ display: 'flex', gap: 28, fontSize: 13, color: 'var(--fg-1)' }}>
          {['Product', 'Use cases', 'Pricing', 'Docs'].map(l => (
            <a key={l} href="#" style={{ color: 'inherit', textDecoration: 'none' }} data-cursor="hover">{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--fg-1)', cursor: 'pointer' }} data-cursor="hover">Inloggen</span>
          <Button primary icon={<ArrowIcon />} accent={accent}>Let's meet</Button>
        </div>
      </nav>
    </div>
  );
};
