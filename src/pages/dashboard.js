import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, Timestamp, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InventoryItem from '../components/InventoryItem';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const [itemName, setItemName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(collection(db, 'users', user.uid, 'pantry'), (snapshot) => {
        const fetchedItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(fetchedItems);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleAddItem = async () => {
    if (user) {
      const item = {
        name: itemName,
        expirationDate: Timestamp.fromDate(new Date(expiryDate)),
        quantity: parseInt(quantity),
        uid: user.uid,
      };

      await addDoc(collection(db, 'users', user.uid, 'pantry'), item);
      setItemName('');
      setExpiryDate('');
      setQuantity(0);
    } else {
      console.error('No user is authenticated');
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h2>Pantry Dashboard</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="New Item"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleAddItem} className={styles.button}>Add Item</button>
      </div>
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
          {items.map((item) => (
            <InventoryItem key={item.id} item={item} id={item.id} />
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
}
