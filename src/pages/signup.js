// signup.js
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import styles from '../styles/signup.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', auth.currentUser);
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.message);
    }
  };

  return (

    <div className={styles.container}>
        <Navbar/>
      <form onSubmit={handleSignup} className={styles.form}>
        <h2 className={styles.title}>Signup</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Signup</button>
      </form>
      <Footer/>
    </div>
  );
}
