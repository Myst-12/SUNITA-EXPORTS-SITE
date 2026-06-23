import styles from './QualityTimeline.module.css';

const steps = [
  {
    number: 1,
    title: 'Direct Sourcing',
    description:
      'Procured from trusted Indian farms and verified agri-mandis',
  },
  {
    number: 2,
    title: 'Cleaning & Processing',
    description:
      'Distoner, Gravity Separator, and Sortex machines remove impurities',
  },
  {
    number: 3,
    title: 'Quality Testing',
    description:
      'Lab-tested for moisture, purity, and compliance with importing country standards',
  },
  {
    number: 4,
    title: 'Custom Packaging',
    description:
      'Packed to buyer specs — retail pouches, bulk bags, or private label',
  },
  {
    number: 5,
    title: 'Global Shipment',
    description:
      'Exported via Mumbai port with full documentation: Phytosanitary, COO, COA & more',
  },
];

export default function QualityTimeline() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Our Process</span>
          <h2 className={styles.title}>From Farm to Global Markets</h2>
          <p className={styles.subtitle}>
            Every product goes through our rigorous 5-step quality process
          </p>
        </div>

        <div className={styles.timeline}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
