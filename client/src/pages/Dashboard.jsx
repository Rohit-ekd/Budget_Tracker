import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";
import "../styles/dashboard.css";

function Dashboard() {
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editTransaction, setEditTransaction] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSummary = async () => {
    try {
      const res = await API.get("/transactions/summary");
      setSummary(res.data);
    } catch (fetchError) {
      console.log(fetchError);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
      setLoading(false);
    } catch (fetchError) {
      console.log(fetchError);
      setError(
        fetchError.response?.data?.message ||
          fetchError.message ||
          "Failed to load transactions",
      );
      setLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      fetchTransactions();
      fetchSummary();
    } catch (deleteError) {
      console.log(deleteError);
    }
  };

  const handleEdit = (transaction) => {
    setEditTransaction(transaction);
  };

  const clearEdit = () => {
    setEditTransaction(null);
  };

  const refreshData = () => {
    fetchTransactions();
    fetchSummary();
  };

  const filteredTransactions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return transactions.filter((item) => {
      const date = new Date(item.date);
      const monthOk = date.getMonth() === Number(selectedMonth);
      const searchOk =
        !q ||
        item.title?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q);
      return monthOk && searchOk;
    });
  }, [transactions, selectedMonth, searchQuery]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    Promise.resolve().then(async () => {
      setError("");
      await Promise.allSettled([fetchTransactions(), fetchSummary()]);
    });
  }, []);

  if (loading) {
    return (
      <div className="dashboard-state">
        <h2>Loading...</h2>
        {error ? <p>{error}</p> : null}
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-state">
        <h2>Dashboard failed to load</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-shell">
      <Navbar />

      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <span className="dashboard-kicker">Monthly money control</span>
          <h1 className="dashboard-hero-title">
            See your budget move in real time.
          </h1>
          <p className="dashboard-hero-text">
            Filter by month, search faster, and act on transactions from one
            cleaner workspace that adapts better across phone, tablet, and
            desktop.
          </p>

          <div className="dashboard-hero-meta">
            <div className="dashboard-card dashboard-card-income">
              <p className="dashboard-card-label">Total Income</p>
              <p className="dashboard-card-value">Rs. {summary.income}</p>
              <p className="dashboard-card-trend">Money added to this account</p>
            </div>

            <div className="dashboard-card dashboard-card-expense">
              <p className="dashboard-card-label">Total Expense</p>
              <p className="dashboard-card-value">Rs. {summary.expense}</p>
              <p className="dashboard-card-trend">Tracked outgoing spend</p>
            </div>

            <div className="dashboard-card dashboard-card-balance">
              <p className="dashboard-card-label">Balance</p>
              <p className="dashboard-card-value">Rs. {summary.balance}</p>
              <p className="dashboard-card-trend">
                Current overall difference
              </p>
            </div>
          </div>
        </div>

        <aside className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2 className="dashboard-panel-title">Find what matters quickly</h2>
              <p className="dashboard-panel-subtitle">
                Switch months and narrow the list without losing context.
              </p>
            </div>
          </div>

          <div className="dashboard-filters">
            <label className="dashboard-field">
              <span className="dashboard-field-label">Month</span>
              <select
                className="dashboard-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={i}>
                    {new Date(2020, i, 1).toLocaleString("en-US", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </label>

            <label className="dashboard-field">
              <span className="dashboard-field-label">Search</span>
              <input
                className="dashboard-input"
                placeholder="Search by title or category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>

          <div className="dashboard-form-actions">
            <span className="dashboard-chip">
              {filteredTransactions.length} matching transaction
              {filteredTransactions.length === 1 ? "" : "s"}
            </span>
          </div>
        </aside>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-panel">
          <TransactionForm
            key={editTransaction?._id || "new-transaction"}
            onTransactionAdded={refreshData}
            editTransaction={editTransaction}
            clearEdit={clearEdit}
          />
        </div>

        <div className="dashboard-panel">
          <ExpenseChart transactions={filteredTransactions} />
        </div>
      </section>

      <section className="dashboard-panel" style={{ marginTop: "18px" }}>
        <TransactionList
          transactions={filteredTransactions}
          onDelete={deleteTransaction}
          onEdit={handleEdit}
        />
      </section>
    </div>
  );
}

export default Dashboard;
