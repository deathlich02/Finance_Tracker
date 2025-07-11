import { useState } from "react";
import axios from "../api/axios";
import { FaPlus, FaTrash, FaPen } from "react-icons/fa";

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
    <div className="space-y-6 text-white">
      <form onSubmit={handleAdd} className="space-y-2">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
    <input
      type="text"
      placeholder="Name"
      value={newExpense.name}
      onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
      required
      className="w-full px-3 py-2 rounded-md bg-zinc-800 text-white"
    />
    <input
      type="number"
      placeholder="Amount"
      value={newExpense.amount}
      onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
      required
      className="w-full px-3 py-2 rounded-md bg-zinc-800 text-white"
    />
    <input
      type="text"
      placeholder="Category"
      value={newExpense.category}
      onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
      required
      className="w-full px-3 py-2 rounded-md bg-zinc-800 text-white"
    />
  </div>

  <div>
    <button
      type="submit"
      className="bg-zinc-200 text-black px-4 py-2 rounded-md hover:bg-zinc-300 transition"
    >
     <FaPlus size={14} />
    </button>
  </div>
</form>



      <div className="space-y-1">
        {expenses.map((exp) =>
          editingId === exp.id ? (
            <form
              key={exp.id}
              onSubmit={handleUpdate}
              className="flex items-center gap-2 bg-zinc-800 p-2 rounded-md"
            >
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="flex-1 bg-zinc-900 px-2 py-1 rounded"
                required
              />
              <input
                type="number"
                value={editData.amount}
                onChange={(e) => setEditData({ ...editData, amount: parseFloat(e.target.value) })}
                className="w-24 bg-zinc-900 px-2 py-1 rounded"
                required
              />
              <input
                type="text"
                value={editData.category}
                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                className="w-32 bg-zinc-900 px-2 py-1 rounded"
                required
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setEditData({ name: "", amount: "", category: "" });
                }}
                className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div
  key={exp.id}
  className="flex items-center justify-between px-4 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition w-full overflow-x-auto"
>
              <div className="space-y-1 max-w-full overflow-x-auto">
                <span className="w-40 truncate">{exp.name}</span>
                <span className="w-20"> ₹{exp.amount}</span>
                <span className="w-28 text-gray-400"> {exp.category}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="bg-zinc-200 text-black px-4 py-2 rounded-md hover:bg-zinc-300 transition"
                >
                  <FaPen size={14} />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
