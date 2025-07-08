// components/IncomeSection.jsx
import { useState } from "react";
import axios from "../api/axios";

export default function IncomeSection({ incomes, fetchIncomes, authHeader }) {
  const [newIncome, setNewIncome] = useState({ name: "", amount: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", amount: "" });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/incomes", newIncome, authHeader);
      setNewIncome({ name: "", amount: "" });
      fetchIncomes();
    } catch (err) {
      console.error("Failed to add income", err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({ name: item.name, amount: item.amount });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/incomes/${editingId}`, editData, authHeader);
      setEditingId(null);
      setEditData({ name: "", amount: "" });
      fetchIncomes();
    } catch (err) {
      console.error("Failed to update income", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/incomes/${id}`, authHeader);
      fetchIncomes();
    } catch (err) {
      console.error("Failed to delete income", err);
    }
  };

  return (
    <div>
      <h2>Add Income</h2>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Name" value={newIncome.name} onChange={(e) => setNewIncome({ ...newIncome, name: e.target.value })} required />
        <input type="number" placeholder="Amount" value={newIncome.amount} onChange={(e) => setNewIncome({ ...newIncome, amount: parseFloat(e.target.value) })} required />
        <button type="submit">Add</button>
      </form>

      <h3>Your Incomes</h3>
      <ul>
        {incomes.map((inc) => (
          <li key={inc.id}>
            {editingId === inc.id ? (
              <form onSubmit={handleUpdate}>
                <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} required />
                <input type="number" value={editData.amount} onChange={(e) => setEditData({ ...editData, amount: parseFloat(e.target.value) })} required />
                <button type="submit">Save</button>
                <button type="button" onClick={() => { setEditingId(null); setEditData({ name: "", amount: "" }); }}>Cancel</button>
              </form>
            ) : (
              <>
                {inc.name} - ₹{inc.amount}
                <button onClick={() => handleEdit(inc)}>Edit</button>
                <button onClick={() => handleDelete(inc.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
