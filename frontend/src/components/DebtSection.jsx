import { useState } from "react";
import axios from "../api/axios";
import { FaPlus, FaTrash, FaPen } from "react-icons/fa";

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
    <div className="space-y-6 text-white">
      <form onSubmit={handleAdd} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newDebt.name}
            onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
            required
            className="w-full px-3 py-2 rounded-md bg-zinc-800 text-white"
          />
          <input
            type="number"
            placeholder="Total"
            value={newDebt.total}
            onChange={(e) => setNewDebt({ ...newDebt, total: parseFloat(e.target.value) })}
            required
            className="w-full px-3 py-2 rounded-md bg-zinc-800 text-white"
          />
          <input
            type="date"
            value={newDebt.dueDate}
            onChange={(e) => setNewDebt({ ...newDebt, dueDate: e.target.value })}
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
        {debts.map((debt) =>
          editingId === debt.id ? (
            <form
              key={debt.id}
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
                value={editData.total}
                onChange={(e) => setEditData({ ...editData, total: parseFloat(e.target.value) })}
                className="w-24 bg-zinc-900 px-2 py-1 rounded"
                required
              />
              <input
                type="date"
                value={editData.dueDate}
                onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                className="w-40 bg-zinc-900 px-2 py-1 rounded"
                required
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setEditData({ name: "", total: "", dueDate: "" });
                }}
                className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div
              key={debt.id}
              className="flex items-center justify-between px-4 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition w-full overflow-x-auto"
            >
              <div className="space-y-1 max-w-full overflow-x-auto">
                <span className="w-40 truncate">{debt.name}</span>
                <span className="w-24">₹{debt.total} </span>
                <span className="w-40 text-gray-400">
                   Due: {new Date(debt.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(debt)}
                  className="bg-zinc-200 text-black px-4 py-2 rounded-md hover:bg-zinc-300 transition"
                >
                  <FaPen size={14} />
                </button>
                <button
                  onClick={() => handleDelete(debt.id)}
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
