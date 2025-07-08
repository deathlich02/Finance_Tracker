// components/OverviewPieChart.jsx
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OverviewPieChart({ expenses, incomes, debts }) {
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const totalIncomes = incomes.reduce((acc, i) => acc + i.amount, 0);
  const totalDebts = debts.reduce((acc, d) => acc + d.total, 0);

  const savings = Math.max(totalIncomes - totalExpenses - totalDebts, 0);

  const data = {
    labels: ["Expenses", "Debts", "Income", "Savings"],
    datasets: [
      {
        data: [totalExpenses, totalDebts, totalIncomes, savings],
        backgroundColor: ["#FF6384", "#FF9F40", "#36A2EB", "#4BC0C0"],
        borderWidth: 1,
      }
    ]
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h3>Financial Overview</h3>
      <Pie data={data} />
    </div>
  );
}
