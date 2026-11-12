'use client';

import Link from '@/components/Link';
import Icon from './Icon';
import { useBasket } from '@/lib/enquiryBasket';
import { track } from '@/lib/track';
import styles from './AddToEnquiry.module.css';

/**
 * "Add to quote list" toggle for a bulk product. `compact` is the small round button laid over product cards;
 * the full version sits beside "Request quote" on product pages and links to the list once something is in it.
 */
export default function AddToEnquiry({ slug, name, compact = false }) {
  const { has, toggle, items, ready } = useBasket();
  const on = ready && has(slug);
  const click = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!on) track('add_to_quote_list', { product: slug });
    toggle({ slug, name });
  };

  if (compact) {
    return (
      <button type="button" className={`${styles.round} ${on ? styles.on : ''}`} onClick={click} aria-pressed={on}
        aria-label={on ? `Remove ${name} from quote list` : `Add ${name} to quote list`} title={on ? 'In your quote list' : 'Add to quote list'}>
        <Icon name={on ? 'check' : 'plus'} size={16} />
      </button>
    );
  }
  return (
    <span className={styles.wrap}>
      <button type="button" className={`btn btn-outline btn-lg ${on ? styles.fullOn : ''}`} onClick={click} aria-pressed={on}>
        <Icon name={on ? 'check' : 'plus'} /> {on ? 'In your quote list' : 'Add to quote list'}
      </button>
      {on && items.length > 0 && <Link href="/contact/?list=1" rel="nofollow" className="link-arrow">Quote list ({items.length}) <Icon name="arrow-right" /></Link>}
    </span>
  );
}
