function TransactionList({ transactions, onDelete, onEdit }) {
  if (transactions.length === 0) {
    return (
      <div className="dashboard-empty">
        <div>
          <h3 className="text-lg font-semibold">No transactions found.</h3>
          <p>Try another month or add a new transaction to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-panel-header">
        <div>
          <h2 className="dashboard-panel-title">Transactions</h2>
          <p className="dashboard-panel-subtitle">
            Review, edit, or remove entries from the current filtered view.
          </p>
        </div>
        <span className="dashboard-chip">{transactions.length} items</span>
      </div>

      <div className="dashboard-list">
        {transactions.map((item) => (
          <article key={item._id} className="dashboard-transaction">
            <div>
              <h4 className="dashboard-transaction-title">{item.title}</h4>
              <div className="dashboard-transaction-meta">
                <span className="dashboard-chip">{item.category}</span>
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="dashboard-transaction-actions">
              <span
                className={
                  "dashboard-amount " +
                  (item.type === "income"
                    ? "dashboard-amount-income"
                    : "dashboard-amount-expense")
                }
              >
                Rs. {item.amount}
              </span>

              <button
                className="dashboard-btn-secondary"
                type="button"
                onClick={() => onEdit(item)}
              >
                Edit
              </button>

              <button
                className="dashboard-btn-ghost"
                type="button"
                onClick={() => onDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
