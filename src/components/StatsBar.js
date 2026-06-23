'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './StatsBar.module.css';

const stats = [
  { number: 30, suffix: '+', label: 'Years of Excellence' },
  { number: 40, suffix: '+', label: 'Countries Reached' },
  { number: 8, suffix: '', label: 'Global Certifications' },
  { number: 300, suffix: '+', label: 'Products Exported' },
  { number: 500, suffix: '+', label: 'Happy Clients' },
];

function AnimatedNumber({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }

    requestAnimationFrame(animate);
  }, [isVisible, target]);

  return (
    <span className={styles.number}>
      {count}{suffix}
    </span>
  );
}

export default function StatsBar() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.bar} ref={sectionRef} id="stats-bar">
      <div className={`container ${styles.container}`}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles.statItem}>
            <AnimatedNumber
              target={stat.number}
              suffix={stat.suffix}
              isVisible={isVisible}
            />
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
