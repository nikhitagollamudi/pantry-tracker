import { doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import styles from '../styles/InventoryItem.module.css';

const InventoryItem = ({ item, id }) => {
  const handleDelete = async () => {
    const user = auth.currentUser;
    if (user) {
      await deleteDoc(doc(db, 'users', user.uid, 'pantry', id));
    } else {
      console.error('No user is authenticated');
    }
  };

  const parseDate = (date) => {
    if (date && date.toDate) {
      return date.toDate().toLocaleDateString();
    }
    return 'Invalid Date';
  };

  return (
    <tr className={styles.item}>
      <td>{item.name}</td>
      <td>{parseDate(item.expirationDate)}</td>
      <td>{item.quantity}</td>
      <td>
        <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
      </td>
    </tr>
  );
};

export default InventoryItem;
