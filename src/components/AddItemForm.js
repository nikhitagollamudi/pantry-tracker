import { useState } from 'react';

const AddItemForm = ({ onAdd }) => {
  const [newItem, setNewItem] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem && expirationDate) {
      onAdd(newItem, expirationDate);
      setNewItem('');
      setExpirationDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <input
        type="date"
        placeholder="Expiration Date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
