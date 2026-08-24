import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import ChatBot from "../components/ChatBot";
import { Bell, Search, UserRound } from "lucide-react";

const pageTitles = {
    dashboard: "Overview",
    employees: "Employees",
    "add-employee": "Add employee",
    "my-leaves": "My leaves",
    "apply-leave": "Apply leave",
    attendance: "Attendance",
    "attendance-management": "Attendance management",
    "leave-requests": "Leave requests",
    offboarding: "Offboarding",
    holidays: "Holidays",
    "holiday-management": "Holiday management",
    reports: "Reports",
    settings: "Settings"
};

function MainLayout({
    role,
    sidebarCollapsed,
    setSidebarCollapsed,
    handleLogout
}) {

    const location = useLocation();
    const routeName = location.pathname.split("/").filter(Boolean).pop() || "dashboard";
    const pageTitle = pageTitles[routeName] || "Workspace";
    const email = localStorage.getItem("email") || "Workspace member";

    return (

        <div className="app-shell">

            <div className="dashboard-layout">

                <header className="dashboard-header">

                    <div>

                        <h1 className="app-title">
                            Welcome back, {role}
                        </h1>

                        <p className="hero-copy">
                            Manage employees, leave requests, reports and dashboard analytics from one place.
                        </p>

                    </div>

                    <button
                        className="btn btn-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </header>

                <div className="dashboard-topbar">
                    <div className="topbar-context">
                        <Breadcrumbs />
                        <h2>{pageTitle}</h2>
                    </div>

                    <div className="topbar-actions">
                        <label className="global-search">
                            <Search size={17} aria-hidden="true" />
                            <span className="visually-hidden">Search workspace</span>
                            <input type="search" placeholder="Search workspace" />
                        </label>
                        <button className="icon-button" type="button" aria-label="Notifications">
                            <Bell size={18} aria-hidden="true" />
                            <span className="notification-dot" aria-hidden="true" />
                        </button>
                        <div className="account-chip">
                            <span className="account-avatar"><UserRound size={17} aria-hidden="true" /></span>
                            <span className="account-copy">
                                <strong>{email}</strong>
                                <small>{role}</small>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="content-area">

                    <Sidebar
                        role={role}
                        collapsed={sidebarCollapsed}
                        onToggle={() =>
                            setSidebarCollapsed(c => !c)
                        }
                    />

                    <main
                        className={`dashboard-grid ${
                            role === "EMPLOYEE"
                                ? "dashboard-grid--full"
                                : ""
                        }`}
                    >

                        <Outlet />

                    </main>

                </div>

                <div className="dashboard-chatbot">

                    <ChatBot />

                </div>

            </div>

        </div>

    );

}

export default MainLayout;  