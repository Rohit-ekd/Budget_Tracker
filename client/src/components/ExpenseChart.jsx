import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ transactions }) {
  const expenses = transactions.filter((item) => item.type === "expense");

  const categoryTotals = {};

  expenses.forEach((item) => {
    if (categoryTotals[item.category]) {
      categoryTotals[item.category] += item.amount;
    } else {
      categoryTotals[item.category] = item.amount;
    }
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(categoryTotals),
        borderWidth: 1,
        backgroundColor: [
          "#0f766e",
          "#14b8a6",
          "#2dd4bf",
          "#f59e0b",
          "#f97316",
          "#f43f5e",
        ],
        borderColor: "rgba(255, 255, 255, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 16,
        },
      },
    },
  };

  return (
    <div>
      <div className="dashboard-panel-header">
        <div>
          <h2 className="dashboard-panel-title">Expense Distribution</h2>
          <p className="dashboard-panel-subtitle">
            A quick category snapshot for the transactions in view.
          </p>
        </div>
      </div>

      <div className="dashboard-chart-wrap">
        {expenses.length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <div className="dashboard-chart-empty">
            <div>
              <h3 className="text-lg font-semibold">No expense data yet</h3>
              <p>Add or filter to a month with expense entries to see the chart.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseChart;
