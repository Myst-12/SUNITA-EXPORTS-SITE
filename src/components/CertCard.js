import styles from './CertCard.module.css';

export default function CertCard({ name, shortName, issuingBody, description }) {
  return (
    <div className={styles.card}>
      <span className={styles.badge}>{shortName || 'Standard'}</span>
      <h3 className={styles.title}>{name}</h3>
      {issuingBody && <p className={styles.issuing}>Issued by: {issuingBody}</p>}
      <p className={styles.description}>{description}</p>
    </div>
  );
}
