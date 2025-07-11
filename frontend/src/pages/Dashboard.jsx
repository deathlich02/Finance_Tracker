// Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import ExpenseSection from "../components/ExpenseSection.jsx";
import IncomeSection from "../components/IncomeSection.jsx";
import DebtSection from "../components/DebtSection.jsx";
import OverviewPieChart from "../components/OverviewPieChart.jsx";
import TimeLineChart from "../components/TimeLineChart.jsx";
import Card from "../components/Card.jsx";

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
  <div className="p-6 bg-black min-h-screen space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="Overview" subtitle="Income, Expenses, Debts Breakdown">
        <OverviewPieChart expenses={expenses} incomes={incomes} debts={debts} />
      </Card>
      <Card title="Timeline" subtitle="Spending & Savings over Time">
        <TimeLineChart expenses={expenses} incomes={incomes} />
      </Card>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Expenses">
        <ExpenseSection expenses={expenses} fetchExpenses={fetchExpenses} authHeader={authHeader} />
      </Card>
      <Card title="Incomes">
        <IncomeSection incomes={incomes} fetchIncomes={fetchIncomes} authHeader={authHeader} />
      </Card>
      <Card title="Debts">
        <DebtSection debts={debts} fetchDebts={fetchDebts} authHeader={authHeader} />
      </Card>
    </div>
  </div>
);

}
