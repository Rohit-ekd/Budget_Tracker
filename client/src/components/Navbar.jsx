function Navbar() {
  const userName = localStorage.getItem("userName") || "there";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  return (
    <header className="dashboard-topbar">
      <div className="dashboard-brand">
        <div className="dashboard-brand-mark">BT</div>

        <div className="dashboard-brand-copy">
          <span className="dashboard-eyebrow">Smart money flow</span>
          <h2 className="dashboard-brand-title">Budget Tracker</h2>
          <p className="dashboard-brand-text">
            Track spending, income, and balance in one place.
          </p>
        </div>
      </div>

      <div className="dashboard-user">
        <div className="dashboard-user-badge">Welcome, {userName}</div>
        <button className="dashboard-btn-secondary" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
