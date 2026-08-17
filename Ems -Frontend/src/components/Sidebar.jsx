import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { hasAdminAccess, hasManagementAccess } from "../utils/roleUtils";

function Sidebar({ role, collapsed = false, onToggle = () => {} }) {

    return (

        <aside className={`app-sidebar ${collapsed ? "collapsed" : ""}`}>

            <div className="sidebar-top">

                <div className="sidebar-brand">

                    <div className="brand-mark">
                        EI
                    </div>

                    <div className="brand-name">
                        Illuminated
                    </div>

                </div>

                <button
                    className="btn btn-outline-secondary sidebar-toggle"
                    onClick={onToggle}
                    aria-label="Toggle Sidebar"
                >
                    {collapsed ? "»" : "«"}
                </button>

            </div>

            <nav className="sidebar-nav">

                {/* Dashboard */}

                <NavLink
                    to="/dashboard"
                    className="nav-item"
                >
                    <span className="icon">🏠</span>
                    <span className="label">
                        Dashboard
                    </span>
                </NavLink>

                {/* Employees */}

                <NavLink
                    to="/employees"
                    className="nav-item"
                >
                    <span className="icon">👥</span>
                    <span className="label">
                        Employees
                    </span>
                </NavLink>

                {/* Add Employee */}

                {hasManagementAccess(role) && (

                    <NavLink
                        to="/add-employee"
                        className="nav-item"
                    >
                        <span className="icon">➕</span>
                        <span className="label">
                            Add Employee
                        </span>
                    </NavLink>

                )}

                {/* Apply Leave */}

                <NavLink
                    to="/apply-leave"
                    className="nav-item"
                >
                    <span className="icon">📝</span>
                    <span className="label">
                        Apply Leave
                    </span>
                </NavLink>

                {/* My Leaves */}

                <NavLink
                    to="/my-leaves"
                    className="nav-item"
                >
                    <span className="icon">📅</span>
                    <span className="label">
                        My Leaves
                    </span>
                </NavLink>

                {/* Leave Requests */}

                {hasManagementAccess(role) && (

                    <NavLink
                        to="/leave-requests"
                        className="nav-item"
                    >
                        <span className="icon">✅</span>
                        <span className="label">
                            Leave Requests
                        </span>
                    </NavLink>

                )}

                {/* Offboarding */}

                {hasManagementAccess(role) && (

                    <NavLink
                        to="/offboarding"
                        className="nav-item"
                    >
                        <span className="icon">📦</span>
                        <span className="label">
                            Offboarding
                        </span>
                    </NavLink>

                )}

                {/* Attendance */}

                {!hasManagementAccess(role) && (
                    <NavLink
                        to="/attendance"
                        className="nav-item"
                    >
                        <span className="icon">🕒</span>
                        <span className="label">
                            Attendance
                        </span>
                    </NavLink>
                )}

                {/* Attendance Management */}

                {hasManagementAccess(role) && (

                    <NavLink
                        to="/attendance-management"
                        className="nav-item"
                    >
                        <span className="icon">📋</span>
                        <span className="label">
                            Attendance Management
                        </span>
                    </NavLink>

                )}

                {/* Attendance Calendar */}

                <NavLink
                    to="/attendance-calendar"
                    className="nav-item"
                >
                    <span className="icon">📆</span>
                    <span className="label">
                        Attendance Calendar
                    </span>
                </NavLink>

                {/* Settings */}

                <NavLink
                    to="/settings"
                    className="nav-item"
                >
                    <span className="icon">⚙️</span>
                    <span className="label">
                        Settings
                    </span>
                </NavLink>
              {hasManagementAccess(role) ? (

    <NavLink
        to="/holiday-management"
        className="nav-item"
    >
        <span className="icon">🎉</span>
        <span className="label">
            Holiday Management
        </span>
    </NavLink>
    

) : (

    <NavLink
        to="/holidays"
        className="nav-item"
    >
        <span className="icon">📅</span>
        <span className="label">
            Holidays
        </span>
    </NavLink>

)}


                {/* Admin */}

                {hasAdminAccess(role) && (

                    <NavLink
                        to="/admin"
                        className="nav-item"
                    >
                        <span className="icon">🔒</span>
                        <span className="label">
                            Admin
                        </span>
                    </NavLink>
                    

                )}

            </nav>

            <div className="sidebar-footer">

                {hasManagementAccess(role) && (

                    <NavLink
                        to="/add-employee"
                        className="btn btn-primary w-100"
                    >
                        New Employee
                    </NavLink>

                )}

            </div>

        </aside>

    );

}

export default Sidebar;