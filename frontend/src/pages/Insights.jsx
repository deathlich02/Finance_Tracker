import { FaPen, FaTrash, FaPlus } from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "../api/axios";
import Card from "../components/Card";

export default function Insights() {
  const [budgetGoals, setBudgetGoals] = useState([]);
  const [savingGoals, setSavingGoals] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const [category, setCategory] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [savingName, setSavingName] = useState("");
  const [savingTarget, setSavingTarget] = useState("");
  const [savingDeadline, setSavingDeadline] = useState("");

  const [editingBudgetGoal, setEditingBudgetGoal] = useState(null);
  const [editingSavingGoal, setEditingSavingGoal] = useState(null);

  const authHeader = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const fetchGoals = async () => {
    try {
      const res = await axios.get("/goal", authHeader);
      setBudgetGoals(res.data.budgetGoals);
      setSavingGoals(res.data.savingGoals);

      const exp = await axios.get("/api/expenses", authHeader);
      setExpenses(exp.data);

      const inc = await axios.get("/api/incomes", authHeader);
      setIncomes(inc.data);
    } catch (err) {
      console.error("Failed to fetch goals", err);
    }
  };

  useEffect(() => { fetchGoals(); }, []);

  const getTotalIncome = () => incomes.reduce((acc, i) => acc + parseFloat(i.amount), 0);
  const getTotalExpenses = () => expenses.reduce((acc, e) => acc + parseFloat(e.amount), 0);
  const getCurrentSavings = () => getTotalIncome() - getTotalExpenses();
  const getCategorySpending = () => {
    const map = {};
    for (const e of expenses) {
      map[e.category] = (map[e.category] || 0) + parseFloat(e.amount);
    }
    return map;
  };

  const handleCreateBudgetGoal = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/goal/budget", { category, targetAmount, startDate, endDate }, authHeader);
      setCategory(""); setTargetAmount(""); setStartDate(""); setEndDate("");
      fetchGoals();
    } catch (err) { console.error("Failed to create budget goal", err); }
  };

  const handleUpdateBudgetGoal = async (id) => {
    try {
      await axios.put(`/goal/budget/${id}`, editingBudgetGoal, authHeader);
      setEditingBudgetGoal(null);
      fetchGoals();
    } catch (err) { console.error("Failed to update budget goal", err); }
  };

  const handleDeleteBudgetGoal = async (id) => {
    try {
      await axios.delete(`/goal/budget/${id}`, authHeader);
      fetchGoals();
    } catch (err) { console.error("Failed to delete budget goal", err); }
  };

  const handleCreateSavingGoal = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/goal/saving", {
        name: savingName,
        targetAmount: savingTarget,
        deadline: savingDeadline,
      }, authHeader);
      setSavingName(""); setSavingTarget(""); setSavingDeadline("");
      fetchGoals();
    } catch (err) { console.error("Failed to create saving goal", err); }
  };

  const handleUpdateSavingGoal = async (id) => {
    try {
      await axios.put(`/goal/saving/${id}`, editingSavingGoal, authHeader);
      setEditingSavingGoal(null);
      fetchGoals();
    } catch (err) { console.error("Failed to update saving goal", err); }
  };

  const handleDeleteSavingGoal = async (id) => {
    try {
      await axios.delete(`/goal/saving/${id}`, authHeader);
      fetchGoals();
    } catch (err) { console.error("Failed to delete saving goal", err); }
  };

  return (
    <div className="p-6 bg-black min-h-screen space-y-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Budget Card */}
        <Card title="Budget Insights" subtitle="Spending progress by category">
          {budgetGoals.length === 0 ? (
            <p className="text-gray-400">No budget goals to show insights for.</p>
          ) : (
            <ul className="space-y-4">
              {budgetGoals.map((goal) => {
                const spent = getCategorySpending()[goal.category] || 0;
                const percentage = Math.min((spent / goal.targetAmount) * 100, 999).toFixed(1);
                const color =
                  percentage >= 100 ? "bg-red-500"
                  : percentage >= 80 ? "bg-orange-400"
                  : "bg-green-500";

                return (
                  <li key={goal.id}>
                    <p className="text-sm font-medium">
                      <span className="text-gold">{goal.category}</span>: ₹{spent} / ₹{goal.targetAmount} ({percentage}%)
                    </p>
                    <div className="w-full bg-gray-700 h-2 rounded overflow-hidden mt-1">
                      <div className={`h-full ${color}`} style={{ width: `${percentage}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* Saving GoalsCard */}
        <Card title="Saving Goals" subtitle="Savings vs Targets">
          {savingGoals.length === 0 ? (
            <p className="text-gray-400">No saving goals set.</p>
          ) : (
            <ul className="space-y-4">
              {savingGoals.map((goal) => {
                const saved = getCurrentSavings();
                const progress = (saved / goal.targetAmount) * 100;
                const color =
                  progress >= 100 ? "bg-green-500"
                  : progress >= 80 ? "bg-orange-400"
                  : "bg-blue-500";

                return (
                  <li key={goal.id}>
                    <p className="text-sm font-medium">
                      <span className="text-gold">{goal.name}</span>: ₹{saved.toFixed(2)} / ₹{goal.targetAmount}
                    </p>
                    <p className="text-xs text-gray-300">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                    <div className="w-full bg-gray-700 h-2 rounded overflow-hidden mt-1">
                      <div className={`h-full ${color}`} style={{ width: `${Math.min(progress, 100)}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>

      {/* Lists similar to Expense, incomes and debts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Budget Goal List + Form */}
        <Card title="Your Budget Goals">
          <div className="space-y-2">
            {budgetGoals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center justify-between bg-zinc-800 px-4 py-2 rounded-md"
              >
                {editingBudgetGoal?.id === goal.id ? (
                  <form onSubmit={() => handleUpdateBudgetGoal(goal.id)} className="flex flex-wrap items-center gap-2 w-full">
                    <input type="text" value={editingBudgetGoal.category} onChange={(e) => setEditingBudgetGoal({ ...editingBudgetGoal, category: e.target.value })} className="bg-zinc-900 px-2 py-1 rounded w-28" required />
                    <input type="number" value={editingBudgetGoal.targetAmount} onChange={(e) => setEditingBudgetGoal({ ...editingBudgetGoal, targetAmount: e.target.value })} className="bg-zinc-900 px-2 py-1 rounded w-24" required />
                    <input type="date" value={editingBudgetGoal.startDate.split("T")[0]} onChange={(e) => setEditingBudgetGoal({ ...editingBudgetGoal, startDate: e.target.value })} className="bg-zinc-900 px-2 py-1 rounded w-36" required />
                    <input type="date" value={editingBudgetGoal.endDate.split("T")[0]} onChange={(e) => setEditingBudgetGoal({ ...editingBudgetGoal, endDate: e.target.value })} className="bg-zinc-900 px-2 py-1 rounded w-36" required />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">Save</button>
                    <button type="button" onClick={() => setEditingBudgetGoal(null)} className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm">Cancel</button>
                  </form>
                ) : (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gold">{goal.category}: ₹{goal.targetAmount}</p>
                      <p className="text-xs text-gray-400">From {new Date(goal.startDate).toLocaleDateString()} to {new Date(goal.endDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingBudgetGoal(goal)} className="bg-zinc-200 text-black p-2 rounded-md hover:bg-zinc-300 transition"><FaPen size={14} /></button>
                      <button onClick={() => handleDeleteBudgetGoal(goal.id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"><FaTrash size={14} /></button>
                    </div>
                  </>
                )}
              </div>
            ))}

          <form onSubmit={handleCreateBudgetGoal} className="space-y-2 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="bg-zinc-900 px-3 py-2 rounded-md text-white" required />
              <input type="number" placeholder="Target Amount" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} className="bg-zinc-900 px-3 py-2 rounded-md text-white" required />
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-zinc-900 px-3 py-2 rounded-md text-white" required />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-zinc-900 px-3 py-2 rounded-md text-white" required />
            </div>
            <button type="submit" className="bg-zinc-200 text-black px-4 py-2 rounded-md hover:bg-zinc-300 transition flex items-center gap-2">
              <FaPlus size={14} /> Add Budget Goal
            </button>
          </form>
        </div>
      </Card>


        {/* Saving Goal List + Form */}
      <Card title="Your Saving Goals">
        <div className="space-y-2">
          {savingGoals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center justify-between bg-zinc-800 px-4 py-2 rounded-md"
            >
              {editingSavingGoal?.id === goal.id ? (
                <form onSubmit={() => handleUpdateSavingGoal(goal.id)} className="flex flex-wrap items-center gap-2 w-full">
                  <input type="text" value={editingSavingGoal.name} onChange={(e) => setEditingSavingGoal({ ...editingSavingGoal, name: e.target.value })} className="bg-zinc-900 px-2 py-1 rounded w-28" required />
                  <input type="number" value={editingSavingGoal.targetAmount} onChange={(e) => setEditingSavingGoal({ ...editingSavingGoal, targetAmount: e.target.value })} className="bg-zinc-900 px-2 py-1 rounded w-24" required />
                  <input type="date" value={editingSavingGoal.deadline.split("T")[0]} onChange={(e) => setEditingSavingGoal({ ...editingSavingGoal, deadline: e.target.value })} className="bg-zinc-900 px-2 py-1 rounded w-36" required />
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">Save</button>
                  <button type="button" onClick={() => setEditingSavingGoal(null)} className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm">Cancel</button>
                </form>
              ) : (
                <>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gold">{goal.name}: ₹{goal.targetAmount}</p>
                    <p className="text-xs text-gray-400">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingSavingGoal(goal)} className="bg-zinc-200 text-black p-2 rounded-md hover:bg-zinc-300 transition"><FaPen size={14} /></button>
                    <button onClick={() => handleDeleteSavingGoal(goal.id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"><FaTrash size={14} /></button>
                  </div>
                </>
              )}
            </div>
          ))}

          <form onSubmit={handleCreateSavingGoal} className="space-y-2 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input type="text" placeholder="Name" value={savingName} onChange={(e) => setSavingName(e.target.value)} className="bg-zinc-900 px-3 py-2 rounded-md text-white" required />
              <input type="number" placeholder="Target Amount" value={savingTarget} onChange={(e) => setSavingTarget(e.target.value)} className="bg-zinc-900 px-3 py-2 rounded-md text-white" required />
              <input type="date" value={savingDeadline} onChange={(e) => setSavingDeadline(e.target.value)} className="bg-zinc-900 px-3 py-2 rounded-md text-white" required />
            </div>
            <button type="submit" className="bg-zinc-200 text-black px-4 py-2 rounded-md hover:bg-zinc-300 transition flex items-center gap-2">
              <FaPlus size={14} /> Add Saving Goal
            </button>
          </form>
        </div>
      </Card>


      </div>
    </div>
  );
}
