'use client';

import { useTransition } from './TransitionContext';
import styles from './TransitionOverlay.module.scss';

export default function TransitionOverlay() {
  const { phase } = useTransition();

  if (phase === 'idle') return null;

  return (
    <div className={styles.overlay} aria-hidden="true">
      {/* Left door panel */}
      <div
        className={`${styles.panel} ${styles.panelLeft} ${
          phase === 'closing' ? styles.closing :
          phase === 'closed' ? styles.closed :
          phase === 'opening' ? styles.opening : ''
        }`}
      >
        <div className={styles.panelGradient} />
        {/* Decorative hairlines inside the door */}
        <div className={styles.panelLine} style={{ right: '20%' }} />
        <div className={styles.panelLine} style={{ right: '40%' }} />
      </div>

      {/* Right door panel */}
      <div
        className={`${styles.panel} ${styles.panelRight} ${
          phase === 'closing' ? styles.closing :
          phase === 'closed' ? styles.closed :
          phase === 'opening' ? styles.opening : ''
        }`}
      >
        <div className={styles.panelGradient} />
        <div className={styles.panelLine} style={{ left: '20%' }} />
        <div className={styles.panelLine} style={{ left: '40%' }} />
      </div>

      {/* Center vertical line — draws during close, fades during open */}
      <div
        className={`${styles.centerLine} ${
          phase === 'closing' ? styles.lineDrawing :
          phase === 'closed' ? styles.lineVisible :
          phase === 'opening' ? styles.lineFading : ''
        }`}
      />

      {/* Branded icon appears while doors are closed */}
      <div
        className={`${styles.brandMark} ${
          phase === 'closed' ? styles.brandVisible : ''
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/brand/icon.svg"
          alt=""
          className={styles.brandIcon}
        />
      </div>
    </div>
  );
}
