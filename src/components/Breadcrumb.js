import Link from 'next/link';
import styles from './Breadcrumb.module.css';

export default function Breadcrumb({ items = [] }) {
  // Always prepend Home to the breadcrumbs list
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: `https://www.sunitaexports.com${item.href}`,
    })),
  };

  return (
    <div className={styles.breadcrumbContainer}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            {allItems.map((item, idx) => {
              const isLast = idx === allItems.length - 1;
              return (
                <li key={idx} className={styles.breadcrumbItem}>
                  {idx > 0 && <span className={styles.separator} aria-hidden="true">/</span>}
                  {isLast ? (
                    <span className={styles.activeItem} aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.href} className={styles.link}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
