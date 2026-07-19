import { useState } from "react";
import API from "../services/api";

const getInitialFormData = (transaction) => ({
  title: transaction?.title || "",
  amount: transaction?.amount || "",
  category: transaction?.category || "",
  type: transaction?.type || "expense",
  date: transaction?.date
    ? new Date(transaction.date).toISOString().split("T")[0]
    : "",
});

function TransactionForm({ onTransactionAdded, editTransaction, clearEdit }) {
  const [formData, setFormData] = useState(() =>
    getInitialFormData(editTransaction),
  );
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (editTransaction) {
        await API.put(`/transactions/${editTransaction._id}`, formData);
        clearEdit();
      } else {
        await API.post("/transactions", formData);
      }

      onTransactionAdded();

      setFormData(getInitialFormData(null));
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="dashboard-panel-header">
        <div>
          <h2 className="dashboard-panel-title">
            {editTransaction ? "Update transaction" : "Add a new transaction"}
          </h2>
          <p className="dashboard-panel-subtitle">
            Keep entries current so your chart and monthly view stay useful.
          </p>
        </div>
      </div>

      <div className="dashboard-form-grid">
        <label className="dashboard-field">
          <span className="dashboard-field-label">Title</span>
          <input
            className="dashboard-input"
            name="title"
            placeholder="Groceries, Salary, Internet bill..."
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label className="dashboard-field">
          <span className="dashboard-field-label">Amount</span>
          <input
            className="dashboard-input"
            name="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>

        <label className="dashboard-field">
          <span className="dashboard-field-label">Category</span>
          <select
            className="dashboard-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
            <option value="Bills">Bills</option>
          </select>
        </label>

        <label className="dashboard-field">
          <span className="dashboard-field-label">Type</span>
          <select
            className="dashboard-select"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label className="dashboard-field">
          <span className="dashboard-field-label">Date</span>
          <input
            className="dashboard-input"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="dashboard-form-actions">
        <button className="dashboard-btn" type="submit" disabled={saving}>
          {saving
            ? "Saving..."
            : editTransaction
              ? "Update Transaction"
              : "Add Transaction"}
        </button>

        {editTransaction && (
          <button
            className="dashboard-btn-secondary"
            type="button"
            onClick={clearEdit}
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}

export default TransactionForm;
