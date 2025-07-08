// components/ExpenseSection.jsx
import { useState } from "react";
import axios from "../api/axios";

export default function ExpenseSection({ expenses, fetchExpenses, authHeader }) {
  const [newExpense, setNewExpense] = useState({ name: "", amount: "", category: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", amount: "", category: "" });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/expenses", newExpense, authHeader);
      setNewExpense({ name: "", amount: "", category: "" });
      fetchExpenses();
    } catch (err) {
      console.error("Failed to add expense", err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({ name: item.name, amount: item.amount, category: item.category });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/expenses/${editingId}`, editData, authHeader);
      setEditingId(null);
      setEditData({ name: "", amount: "", category: "" });
      fetchExpenses();
    } catch (err) {
      console.error("Failed to update expense", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`, authHeader);
      fetchExpenses();
    } catch (err) {
      console.error("Failed to delete expense", err);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Name" value={newExpense.name} onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })} required />
        <input type="number" placeholder="Amount" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })} required />
        <input type="text" placeholder="Category" value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} required />
        <button type="submit">Add</button>
      </form>

      <h3>Your Expenses</h3>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {editingId === exp.id ? (
              <form onSubmit={handleUpdate}>
                <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} required />
                <input type="number" value={editData.amount} onChange={(e) => setEditData({ ...editData, amount: parseFloat(e.target.value) })} required />
                <input type="text" value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} required />
                <button type="submit">Save</button>
                <button type="button" onClick={() => { setEditingId(null); setEditData({ name: "", amount: "", category: "" }); }}>Cancel</button>
              </form>
            ) : (
              <>
                {exp.name} - ₹{exp.amount} [{exp.category}]
                <button onClick={() => handleEdit(exp)}>Edit</button>
                <button onClick={() => handleDelete(exp.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
