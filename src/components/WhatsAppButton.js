import Icon from './Icon';
import { whatsappLink } from '@/config/site';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink('Hello Sunita Agri Exports, I am interested in importing from India. Please share your catalogue and a quotation.')}
      className={styles.fab}
      data-fab
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <Icon name="whatsapp" size={28} />
      <span className={styles.label}>Chat with us</span>
    </a>
  );
}
