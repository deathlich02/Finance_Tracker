// Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import ExpenseSection from "../components/ExpenseSection.jsx";
import IncomeSection from "../components/IncomeSection.jsx";
import DebtSection from "../components/DebtSection.jsx";
import OverviewPieChart from "../components/OverviewPieChart.jsx";
import TimeLineChart from "../components/TimeLineChart.jsx";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [debts, setDebts] = useState([]);

  const authHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("/api/expenses", authHeader);
      setExpenses(res.data);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    }
  };

  const fetchIncomes = async () => {
    try {
      const res = await axios.get("/api/incomes", authHeader);
      setIncomes(res.data);
    } catch (err) {
      console.error("Failed to fetch incomes", err);
    }
  };

  const fetchDebts = async () => {
    try {
      const res = await axios.get("/api/debts", authHeader);
      setDebts(res.data);
    } catch (err) {
      console.error("Failed to fetch debts", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
    fetchDebts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>

      <ExpenseSection
        expenses={expenses}
        fetchExpenses={fetchExpenses}
        authHeader={authHeader}
      />

      <IncomeSection
        incomes={incomes}
        fetchIncomes={fetchIncomes}
        authHeader={authHeader}
      />

      <DebtSection
        debts={debts}
        fetchDebts={fetchDebts}
        authHeader={authHeader}
      />
    {/* Visualization */}
      <OverviewPieChart
        expenses={expenses}
        incomes={incomes}
        debts={debts}
      />

      <TimeLineChart
        expenses={expenses}
        incomes={incomes}
      />
    </div>
  );
}
