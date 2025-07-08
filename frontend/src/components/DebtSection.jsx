// components/DebtSection.jsx
import { useState } from "react";
import axios from "../api/axios";

export default function DebtSection({ debts, fetchDebts, authHeader }) {
  const [newDebt, setNewDebt] = useState({ name: "", total: "", dueDate: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", total: "", dueDate: "" });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/debts", newDebt, authHeader);
      setNewDebt({ name: "", total: "", dueDate: "" });
      fetchDebts();
    } catch (err) {
      console.error("Failed to add debt", err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({ name: item.name, total: item.total, dueDate: item.dueDate });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/debts/${editingId}`, editData, authHeader);
      setEditingId(null);
      setEditData({ name: "", total: "", dueDate: "" });
      fetchDebts();
    } catch (err) {
      console.error("Failed to update debt", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/debts/${id}`, authHeader);
      fetchDebts();
    } catch (err) {
      console.error("Failed to delete debt", err);
    }
  };

  return (
    <div>
      <h2>Add Debt</h2>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Name" value={newDebt.name} onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })} required />
        <input type="number" placeholder="Total" value={newDebt.total} onChange={(e) => setNewDebt({ ...newDebt, total: parseFloat(e.target.value) })} required />
        <input type="date" value={newDebt.dueDate} onChange={(e) => setNewDebt({ ...newDebt, dueDate: e.target.value })} required />
        <button type="submit">Add</button>
      </form>

      <h3>Your Debts</h3>
      <ul>
        {debts.map((debt) => (
          <li key={debt.id}>
            {editingId === debt.id ? (
              <form onSubmit={handleUpdate}>
                <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} required />
                <input type="number" value={editData.total} onChange={(e) => setEditData({ ...editData, total: parseFloat(e.target.value) })} required />
                <input type="date" value={editData.dueDate} onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })} required />
                <button type="submit">Save</button>
                <button type="button" onClick={() => { setEditingId(null); setEditData({ name: "", total: "", dueDate: "" }); }}>Cancel</button>
              </form>
            ) : (
              <>
                {debt.name} - ₹{debt.total} (Due: {new Date(debt.dueDate).toLocaleDateString()})
                <button onClick={() => handleEdit(debt)}>Edit</button>
                <button onClick={() => handleDelete(debt.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
