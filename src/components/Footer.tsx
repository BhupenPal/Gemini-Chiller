import Link from 'next/link';
import styles from '../styles/components/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.logo}>
        <Link href="#header" passHref>
          <img src="/images/logo.png" alt="logo" />
        </Link>
      </div>
      <div className={styles.footNav}>
        <Link href="/#about">About</Link>
        <Link href="/#gallery">Gallery</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/">Affiliate Program</Link>
        <Link href="/#contact">Contact</Link>
      </div>
    </footer>
  );
}
