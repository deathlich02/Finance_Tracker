import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Insights() {
  const [budgetGoals, setBudgetGoals] = useState([]);
  const [savingGoals, setSavingGoals] = useState([]);

  const [expenses, setExpenses] = useState([])
  const [incomes, setIncomes] = useState([]);

  // Budget goal form state
  const [category, setCategory] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Saving goal form state
  const [savingName, setSavingName] = useState("");
  const [savingTarget, setSavingTarget] = useState("");
  const [savingDeadline, setSavingDeadline] = useState("");

  //editing states
  const [editingBudgetGoal, setEditingBudgetGoal] = useState(null);
  const [editingSavingGoal, setEditingSavingGoal] = useState(null);


  const authHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
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

  

  useEffect(() => {
    fetchGoals();
  }, []);

  //Stuff for insights

  const getTotalIncome = () => {
    return incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);
  };
  
  const getTotalExpenses = () => {
    return expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
  };
  
  const getCurrentSavings = () => {
    return getTotalIncome() - getTotalExpenses();
  };
  

  const getCategorySpending = () => {
    const categoryMap = {};
    for (const expense of expenses) {
      if (!categoryMap[expense.category]) categoryMap[expense.category] = 0;
      categoryMap[expense.category] += parseFloat(expense.amount);
    }
    return categoryMap;
  };

  //handlers

  const handleCreateBudgetGoal = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/goal/budget",
        {
          category,
          targetAmount,
          startDate,
          endDate,
        },
        authHeader
      );
      setCategory("");
      setTargetAmount("");
      setStartDate("");
      setEndDate("");
      fetchGoals(); // refresh list
    } catch (err) {
      console.error("Failed to create budget goal", err);
    }
  };

  const handleDeleteBudgetGoal = async (id) => {
    try {
      await axios.delete(`/goal/budget/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchGoals(); // Refresh after deletion
    } catch (err) {
      console.error("Failed to delete budget goal", err);
    }
  };

  const handleUpdateBudgetGoal = async (id) => {
    try {
      await axios.put(`/goal/budget/${id}`, editingBudgetGoal, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEditingBudgetGoal(null);
      fetchGoals();
    } catch (err) {
      console.error("Failed to update budget goal", err);
    }
  };

  const handleCreateSavingGoal = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/goal/saving",
        {
          name: savingName,
          targetAmount: savingTarget,
          deadline: savingDeadline,
        },
        authHeader
      );
      setSavingName("");
      setSavingTarget("");
      setSavingDeadline("");
      fetchGoals(); // refresh list
    } catch (err) {
      console.error("Failed to create saving goal", err);
    }
  };

  const handleDeleteSavingGoal = async (id) => {
    try {
      await axios.delete(`/goal/saving/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchGoals(); // Refresh after deletion
    } catch (err) {
      console.error("Failed to delete saving goal", err);
    }
  };
  

  const handleUpdateSavingGoal = async (id) => {
    try {
      await axios.put(`/goal/saving/${id}`, editingSavingGoal, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEditingSavingGoal(null);
      fetchGoals();
    } catch (err) {
      console.error("Failed to update saving goal", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Insights</h1>

      <h2>Budget Goals</h2>
      {budgetGoals.length === 0 ? (
        <p>No budget goals set.</p>
      ) : (
        <ul>
          {budgetGoals.map((goal) => (
            <li key={goal.id}>
              {editingBudgetGoal?.id === goal.id ? (
                <div>
                  <input
                    type="text"
                    value={editingBudgetGoal.category}
                    onChange={(e) =>
                      setEditingBudgetGoal({ ...editingBudgetGoal, category: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    value={editingBudgetGoal.targetAmount}
                    onChange={(e) =>
                      setEditingBudgetGoal({ ...editingBudgetGoal, targetAmount: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    value={editingBudgetGoal.startDate.split("T")[0]}
                    onChange={(e) =>
                      setEditingBudgetGoal({ ...editingBudgetGoal, startDate: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    value={editingBudgetGoal.endDate.split("T")[0]}
                    onChange={(e) =>
                      setEditingBudgetGoal({ ...editingBudgetGoal, endDate: e.target.value })
                    }
                  />
                  <button onClick={() => handleUpdateBudgetGoal(goal.id)}>Save</button>
                  <button onClick={() => setEditingBudgetGoal(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <strong>{goal.category}</strong>: ₹{goal.targetAmount}
                  <br />
                  From: {new Date(goal.startDate).toLocaleDateString()} To:{" "}
                  {new Date(goal.endDate).toLocaleDateString()}
                  <br />
                  <button onClick={() => setEditingBudgetGoal(goal)}>Edit</button>
                  <button onClick={() => handleDeleteBudgetGoal(goal.id)}>Delete</button>
                </>
              )}
            </li>
          ))}

        </ul>
      )}

      {/* Budget Insights Section */}
<h2 style={{ marginTop: "30px" }}>Budget Insights</h2>
{budgetGoals.length === 0 ? (
  <p>No budget goals to show insights for.</p>
) : (
  <ul>
    {budgetGoals.map((goal) => {
      const categorySpending = getCategorySpending();
      const spent = categorySpending[goal.category] || 0;
      const percentage = Math.min((spent / goal.targetAmount) * 100, 999).toFixed(1);

      let color = "green";
      if (percentage >= 100) color = "red";
      else if (percentage >= 80) color = "orange";

      return (
        <li key={`insight-${goal.id}`} style={{ marginBottom: "15px" }}>
          <strong>{goal.category}</strong> - Spent ₹{spent} / ₹{goal.targetAmount} ({percentage}%)
          <div style={{
            background: "#eee",
            borderRadius: "5px",
            overflow: "hidden",
            height: "10px",
            marginTop: "5px",
          }}>
            <div style={{
              width: `${percentage}%`,
              height: "100%",
              backgroundColor: color,
            }} />
          </div>
          {percentage >= 100 && <p style={{ color: "red" }}>⚠️ You've exceeded your budget!</p>}
          {percentage >= 80 && percentage < 100 && <p style={{ color: "orange" }}>⚠️ You're nearing your limit.</p>}
        </li>
      );
    })}
  </ul>
)}


      <form onSubmit={handleCreateBudgetGoal} style={{ marginTop: "20px" }}>
        <h3>Create Budget Goal</h3>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="submit">Add Budget Goal</button>
      </form>

      <h2 style={{ marginTop: "40px" }}>Saving Goals</h2>
      {savingGoals.length === 0 ? (
        <p>No saving goals set.</p>
      ) : (
        <ul>
          {savingGoals.map((goal) => {
            const saved = getCurrentSavings(); // total savings
            const progress = (saved / goal.targetAmount) * 100;
            const color = progress >= 100 ? 'green' : progress >= 80 ? 'orange' : 'blue';

            return (
              <li key={goal.id} style={{ marginBottom: "20px" }}>
                <strong>{goal.name}</strong>: ₹{saved.toFixed(2)} / ₹{goal.targetAmount}
                <br />
                Deadline: {new Date(goal.deadline).toLocaleDateString()}
                <div
                  style={{
                    width: "100%",
                    height: "10px",
                    backgroundColor: "#eee",
                    marginTop: "5px",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                      height: "100%",
                      backgroundColor: color,
                    }}
                  />
                </div>
                <small style={{ color }}>
                  {progress >= 100
                    ? "Goal achieved!"
                    : progress >= 80
                    ? "Almost there!"
                    : "Keep saving!"}
                </small>
                <br />
                <button onClick={() => setEditingSavingGoal(goal)}>Edit</button>
                <button onClick={() => handleDeleteSavingGoal(goal.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      )}

      <form onSubmit={handleCreateSavingGoal} style={{ marginTop: "20px" }}>
        <h3>Create Saving Goal</h3>
        <input
          type="text"
          placeholder="Name"
          value={savingName}
          onChange={(e) => setSavingName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={savingTarget}
          onChange={(e) => setSavingTarget(e.target.value)}
          required
        />
        <input
          type="date"
          value={savingDeadline}
          onChange={(e) => setSavingDeadline(e.target.value)}
          required
        />
        <button type="submit">Add Saving Goal</button>
      </form>
    </div>
  );
}
