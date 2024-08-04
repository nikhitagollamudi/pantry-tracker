import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className={styles.navbar}>
      {!user && <Link href="/" className={styles.link}>Pantry Tracker</Link>}
      <Link href="/home" className={styles.link}>Home</Link>
      <Link href="/dashboard" className={styles.link}>Dashboard</Link>
      {!user && <Link href="/signup" className={styles.link}>Signup</Link>}
      {user ? (
        <Link href="/" className={styles.link} onClick={handleLogout}>Logout</Link>
      ) : (
        <Link href="/login" className={styles.link}>Login</Link>
      )}
    </div>
  );
};

export default Navbar;
