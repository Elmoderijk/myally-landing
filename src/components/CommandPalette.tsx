import React from 'react';

const scrollToSection = (label: string) => {
  const el = document.querySelector(`[data-section="${label}"]`);
  if (el) {
    const r = el.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + r.top - 80, behavior: 'smooth' });
  }
};

export const CommandPalette = ({ accent }: { accent: string }) => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const allCommands = React.useMemo(() => [
    { label: 'Naar pricing',        action: () => { scrollToSection('pricing'); setOpen(false); } },
    { label: 'Probeer demo',        action: () => { scrollToSection('demo'); setOpen(false); } },
    { label: 'Plan een call',       action: () => { alert('Opens calendar (placeholder)'); setOpen(false); } },
    { label: 'Bekijk timeline',     action: () => { scrollToSection('timeline'); setOpen(false); } },
    { label: 'Hoe het werkt',       action: () => { scrollToSection('hoeitwerkt'); setOpen(false); } },
    { label: 'Veelgestelde vragen', action: () => { scrollToSection('faq'); setOpen(false); } },
    { label: 'Naar boven',          action: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setOpen(false); } },
  ], []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); setOpen(o => !o);
      }
      if (e.key === '/' && !open && (document.activeElement as HTMLElement)?.tagName !== 'INPUT') {
        e.preventDefault(); setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  React.useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [open]);

  const filtered = allCommands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div
        data-cursor="hover"
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', bottom: 24, left: 24, zIndex: 49,
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)',
          textTransform: 'uppercase', letterSpacing: '0.08em',
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', border: '1px solid var(--line)', borderRadius: 6,
          background: 'rgba(10,10,12,0.55)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)', cursor: 'pointer',
        }}
      >
        <kbd style={{ padding: '2px 6px', border: '1px solid var(--line-strong)', borderRadius: 3, fontSize: 10 }}>⌘K</kbd>
        snel navigeren
      </div>

      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(6,6,10,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh',
          animation: 'fadeIn 180ms ease',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: 540, maxWidth: '90vw', background: 'var(--bg-1)',
            border: `1px solid ${accent}44`, borderRadius: 12,
            boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px ${accent}22`,
            overflow: 'hidden', animation: 'paletteIn 240ms cubic-bezier(0.2,0.8,0.2,1)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderBottom: '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>›</span>
              <input ref={inputRef} data-cursor="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Typ een commando…"
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--fg-0)', fontFamily: 'var(--font-sans)', fontSize: 16, padding: '4px 0' }}
              />
              <kbd style={{ padding: '2px 8px', border: '1px solid var(--line-strong)', borderRadius: 3, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-2)' }}>esc</kbd>
            </div>
            <div style={{ padding: 8, maxHeight: 360, overflowY: 'auto' }}>
              {filtered.length === 0 && <div style={{ padding: '20px', textAlign: 'center', fontSize: 13, color: 'var(--fg-2)' }}>Geen commando's gevonden.</div>}
              {filtered.map((cmd) => (
                <button key={cmd.label} data-cursor="hover" onClick={cmd.action} style={{
                  width: '100%', textAlign: 'left', padding: '12px 14px',
                  background: 'transparent', border: 'none', color: 'var(--fg-0)',
                  fontFamily: 'var(--font-sans)', fontSize: 14, cursor: 'pointer', borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'background 140ms ease',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-3)'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}
                >
                  <span>{cmd.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>↵</span>
                </button>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes paletteIn { from { opacity: 0; transform: translateY(-12px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
          `}</style>
        </div>
      )}
    </>
  );
};
