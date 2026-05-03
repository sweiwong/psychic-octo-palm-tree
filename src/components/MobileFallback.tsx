import { useEffect, useState, type ReactNode } from 'react';

const DESKTOP_QUERY = '(min-width: 1024px)';

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia(DESKTOP_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isDesktop;
}

interface MobileFallbackProps {
  children: ReactNode;
}

export function MobileFallback({ children }: MobileFallbackProps) {
  const isDesktop = useIsDesktop();
  if (isDesktop) return <>{children}</>;

  return (
    <div className="mobile-fallback">
      <div className="mobile-fallback-inner">
        <div className="seal" aria-hidden>中</div>
        <h1>Chinese History Map</h1>
        <p className="mobile-fallback-sub">A wrapped timeline atlas, 2070 BCE – 2026</p>
        <img
          src="/desktop-preview.png"
          alt="Preview of the desktop timeline"
          className="mobile-fallback-preview"
        />
        <p className="mobile-fallback-msg">
          This timeline is built for desktop. Open this link on a larger screen to explore.
        </p>
      </div>
    </div>
  );
}
