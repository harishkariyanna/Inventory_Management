import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" });
  const [filter, setFilter] = useState("");
  const [editingId, setEditingId] = useState(null);

  const addItem = () => {
    if (newItem.name && newItem.category && newItem.quantity) {
      setInventory([...inventory, { ...newItem, id: Date.now() }]);
      setNewItem({ name: "", category: "", quantity: "" });
    } else {
      alert("Please fill out all fields!");
    }
  };

  const updateItem = (id, updatedItem) => {
    setInventory(inventory.map(item => (item.id === id ? updatedItem : item)));
    setEditingId(null);
  };

  const deleteItem = id => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const filteredInventory = filter
    ? inventory.filter(item => item.category.toLowerCase().includes(filter.toLowerCase()))
    : inventory;

  const sortedInventory = filteredInventory.sort((a, b) => a.quantity - b.quantity);

  return (
    <div className="container">
      <h1>Dynamic Inventory Management Table</h1>

      <div className="add-item">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={e => setNewItem({ ...newItem, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      <div className="filter">
        <input
          type="text"
          placeholder="Filter by category"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedInventory.map(item => (
            <tr key={item.id} className={item.quantity < 10 ? "low-stock" : ""}>
              <td>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={e =>
                      setInventory(
                        inventory.map(i =>
                          i.id === item.id ? { ...i, name: e.target.value } : i
                        )
                      )
                    }
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.category}
                    onChange={e =>
                      setInventory(
                        inventory.map(i =>
                          i.id === item.id ? { ...i, category: e.target.value } : i
                        )
                      )
                    }
                  />
                ) : (
                  item.category
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e =>
                      setInventory(
                        inventory.map(i =>
                          i.id === item.id
                            ? { ...i, quantity: parseInt(e.target.value) }
                            : i
                        )
                      )
                    }
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <button onClick={() => updateItem(item.id, item)}>Save</button>
                ) : (
                  <button onClick={() => setEditingId(item.id)}>Edit</button>
                )}
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
