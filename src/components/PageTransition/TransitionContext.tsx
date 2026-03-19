'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

type TransitionPhase = 'idle' | 'closing' | 'closed' | 'opening';

interface TransitionContextValue {
  phase: TransitionPhase;
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  phase: 'idle',
  navigateTo: () => {},
});

export function useTransition() {
  return useContext(TransitionContext);
}

// Timing constants (ms)
const CLOSE_DURATION = 800;
const HOLD_DURATION = 200;
const OPEN_DURATION = 900;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const router = useRouter();
  const isTransitioning = useRef(false);

  const navigateTo = useCallback(
    (href: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;

      // Phase 1: Close the doors
      setPhase('closing');

      setTimeout(() => {
        // Phase 2: Doors are closed — navigate
        setPhase('closed');
        router.push(href);

        // Phase 3: Small hold, then open doors
        setTimeout(() => {
          setPhase('opening');

          setTimeout(() => {
            setPhase('idle');
            isTransitioning.current = false;
            // Scroll to top on new page
            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
          }, OPEN_DURATION);
        }, HOLD_DURATION);
      }, CLOSE_DURATION);
    },
    [router]
  );

  return (
    <TransitionContext.Provider value={{ phase, navigateTo }}>
      {children}
    </TransitionContext.Provider>
  );
}
