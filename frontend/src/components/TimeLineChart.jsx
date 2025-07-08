// components/TimeLineChart.jsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

export default function TimeLineChart({ expenses, incomes }) {
  const groupByMonth = (data, field = "amount") => {
    const grouped = {};
    data.forEach((item) => {
      const date = new Date(item.date); // ✅ fixed this line
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      grouped[month] = (grouped[month] || 0) + item[field];
    });
    return grouped;
  };
  

  const expenseByMonth = groupByMonth(expenses);
  const incomeByMonth = groupByMonth(incomes);

  const months = Array.from(new Set([...Object.keys(expenseByMonth), ...Object.keys(incomeByMonth)])).sort();

  const expensesData = months.map((m) => expenseByMonth[m] || 0);
  const incomesData = months.map((m) => incomeByMonth[m] || 0);
  const savingsData = months.map((_, i) => incomesData[i] - expensesData[i]);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Expenses",
        data: expensesData,
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3
      },
      {
        label: "Savings",
        data: savingsData,
        borderColor: "green",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.3
      }
    ]
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h3>Monthly Expenses vs Savings</h3>
      <Line data={data} />
    </div>
  );
}
