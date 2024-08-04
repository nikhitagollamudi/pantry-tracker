import { useRouter } from 'next/router';
import styles from '../styles/landing.module.css';

export default function Landing() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/home'); // Redirect to the index.js page
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Keep Your Pantry Fresh and Organized</h1>
        <img src="/images/pantry-inventory-checklist.jpg" alt="Pantry" className={styles.image} />
        <button onClick={handleGetStarted} className={styles.button}>Get Started</button>
        <div className={styles['cards-container']}>
          <div className={styles.card}>
            <h2 className={styles['card-title']}>Why Pantry Tracker?</h2>
            <p className={styles['card-content']}>
              Our Pantry Tracker helps you keep your pantry organized and up-to-date by tracking expiration dates and quantities. Never let your food go to waste again!
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles['card-title']}>Target Customers</h2>
            <p className={styles['card-content']}>
              Pantry Tracker is perfect for busy families, meal preppers, and anyone looking to reduce food waste and save money by keeping track of their pantry items.
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles['card-title']}>Easy to Use</h2>
            <p className={styles['card-content']}>
              With a simple and intuitive interface, adding and managing your pantry items is a breeze. Get started today and experience the convenience of Pantry Tracker!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
