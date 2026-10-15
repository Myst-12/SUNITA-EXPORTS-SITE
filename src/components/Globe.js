'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Globe.module.css';

const GREEN = [0.03, 0.4, 0.22];
const GREEN_SOFT = [0.2, 0.62, 0.4];
const SPIN = 0.0016; // radians per frame — one turn every ~65 s
const TILT = 0.32;

// Rotation that brings a longitude to the front of the globe.
const facing = (lng) => Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2);

/**
 * Light dotted 3D globe (cobe, loaded client-side only) with arcs from `origin` to each destination.
 * A static image sits underneath, so no-JS, no-WebGL and loading states still show a globe.
 * Spins slowly while on screen; holds still when the visitor prefers reduced motion.
 */
export default function Globe({ origin, destinations, fallback, label }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const probe = document.createElement('canvas');
    if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let globe;
    let raf = 0;
    let visible = false;
    let cancelled = false;
    let phi = facing(origin.coords[1]) - 0.5;
    let t = 0;

    const base = destinations.map((d) => ({ location: d.coords, size: 0.028, color: GREEN_SOFT }));
    const markers = (pulse) => [{ location: origin.coords, size: 0.07 + pulse * 0.025, color: GREEN }, ...base];

    const frame = () => {
      phi += SPIN;
      t += 0.03;
      globe.update({ phi, markers: markers((Math.sin(t) + 1) / 2) });
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!raf && !still && globe) raf = requestAnimationFrame(frame); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    });
    const ro = new ResizeObserver(() => {
      const size = wrap.offsetWidth;
      if (globe && size) globe.update({ width: size, height: size });
    });

    import('cobe').then(({ default: createGlobe }) => {
      if (cancelled) return;
      const size = wrap.offsetWidth;
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: size,
        height: size,
        phi,
        theta: TILT,
        dark: 0,
        diffuse: 0.6,
        mapSamples: 16000,
        mapBrightness: 3,
        mapBaseBrightness: 0,
        baseColor: [1, 1, 1],
        markerColor: GREEN,
        glowColor: [0.94, 0.97, 0.95],
        markers: markers(0.5),
        arcs: destinations.map((d) => ({ from: origin.coords, to: d.coords })),
        arcColor: GREEN_SOFT,
        arcWidth: 0.6,
        arcHeight: 0.3,
        markerElevation: 0.01,
      });
      setReady(true);
      io.observe(wrap);
      ro.observe(wrap);
    });

    return () => {
      cancelled = true;
      stop();
      io.disconnect();
      ro.disconnect();
      globe?.destroy();
    };
  }, [origin, destinations]);

  return (
    <div ref={wrapRef} className={`${styles.globe} ${ready ? styles.ready : ''}`} role="img" aria-label={label}>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative fallback, sized by CSS */}
      <img src={fallback} alt="" className={styles.fallback} loading="lazy" width="800" height="800" />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
