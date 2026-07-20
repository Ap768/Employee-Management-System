import React from "react";
import "./Sidebar.css";

function Sidebar({ role, collapsed = false, onToggle = () => {} }) {
  return (
    <aside className={`app-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <div className="brand-mark">EI</div>
          <div className="brand-name">Illuminated</div>
        </div>

        <button
          className="btn btn-outline-secondary sidebar-toggle"
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          {collapsed ? '»' : '«'}
        </button>
      </div>

      <nav className="sidebar-nav">
        <a className="nav-item active" href="#dashboard"><span className="icon">🏠</span><span className="label">Dashboard</span></a>
        <a className="nav-item" href="#employees"><span className="icon">👥</span><span className="label">Employees</span></a>
        <a className="nav-item" href="#reports"><span className="icon">📊</span><span className="label">Reports</span></a>
        <a className="nav-item" href="#settings"><span className="icon">⚙️</span><span className="label">Settings</span></a>
        {role === "ADMIN" && <a className="nav-item" href="#admin"><span className="icon">🔒</span><span className="label">Admin</span></a>}
      </nav>

      <div className="sidebar-footer">
        <button className="btn btn-primary">New Employee</button>
      </div>
    </aside>
  );
}

export default Sidebar;
