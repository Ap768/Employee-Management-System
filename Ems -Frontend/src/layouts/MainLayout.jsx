import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import ChatBot from "../components/ChatBot";

function MainLayout({
    role,
    sidebarCollapsed,
    setSidebarCollapsed,
    handleLogout
}) {

    return (

        <div className="app-shell">

            <div className="dashboard-layout">

                <header className="dashboard-header">

                    <div>

                        <p className="eyebrow">
                            Employee Management System
                        </p>

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

                        <div className="page-header-row">
                            <Breadcrumbs />
                        </div>
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