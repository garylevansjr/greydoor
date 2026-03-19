'use client';

import { useCallback, type ReactNode, type MouseEvent } from 'react';
import { useTransition } from '@/components/PageTransition/TransitionContext';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
}: TransitionLinkProps) {
  const { navigateTo, phase } = useTransition();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      // If it's a hash link on the same page, just scroll
      if (href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        onClick?.();
        return;
      }

      // Don't trigger if already transitioning
      if (phase !== 'idle') return;

      onClick?.();
      navigateTo(href);
    },
    [href, navigateTo, phase, onClick]
  );

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
