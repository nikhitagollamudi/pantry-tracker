import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InventoryItem from '../components/InventoryItem';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [user] = useAuthState(auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, loading, error] = useCollection(user ? collection(db, 'users', user.uid, 'pantry') : null);

  const getExpiryMessage = () => {
    const currentDate = new Date();
    const expiryItems = items?.docs.filter(doc => {
      const data = doc.data();
      if (data.expirationDate && data.expirationDate.toDate) {
        const expiryDate = data.expirationDate.toDate(); // Convert Firestore Timestamp to Date
        return expiryDate <= currentDate;
      }
      return false;
    });

    if (expiryItems?.length > 0) {
      const itemNames = expiryItems.map(doc => doc.data().name).join(', ');
      return `The following items are expired or nearing expiry: ${itemNames}`;
    } else {
      return 'No items nearing expiry.';
    }
  };

  const filteredItems = items?.docs.filter(doc => {
    const data = doc.data();
    return data.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className={styles.container}>
      <Navbar />
      {user ? (
        <div>
          <h2 className={styles.message}>{getExpiryMessage()}</h2>
          <input 
            type="text" 
            placeholder="Search for an item..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchBar}
          />
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Expiration Date</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems && filteredItems.map((doc) => (
                <InventoryItem key={doc.id} item={doc.data()} id={doc.id} />
              ))}
            </tbody>
          </table>
          <div className={styles.link}>
            <a href="/dashboard" className={styles.button}>Go to Dashboard</a>
          </div>
        </div>
      ) : (
        <div>
          <h1>Welcome to Pantry Tracker</h1>
        </div>
      )}
      <Footer />
    </div>
  );
}
