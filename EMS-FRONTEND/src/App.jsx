import AddEmployee from "./components/AddEmployee";
import ChatBot from "./components/ChatBot";
import EmployeeList from "./components/EmployeeList";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";

import { useState } from "react";

function App() {

    // SELECTED EMPLOYEE
    const [selectedEmployee, setSelectedEmployee]
    = useState(null);

    // LOGIN STATE
    const [isLoggedIn, setIsLoggedIn]
    = useState(() => Boolean(localStorage.getItem("role")));

    // ROLE STATE
    const [role, setRole]
    = useState(() =>
        (localStorage.getItem("role") || "")
            .toUpperCase()
            .replace(/^ROLE_/, "")
    );

    // REFRESH STATE
    const [refresh, setRefresh]
    = useState(false);

    // SIDEBAR COLLAPSE STATE
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setRole("");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
    };

    const isAuthenticated =
        isLoggedIn ||
        Boolean(localStorage.getItem("role"));

    const dashboard = (
        <div className="app-shell">

            <div className="dashboard-layout">

                <div className="dashboard-header">

                    <p className="eyebrow">Illuminated employee insights</p>

                    <div className="d-flex justify-content-between align-items-start gap-3 flex-column flex-md-row">
                        <div>
                            <h1 className="app-title">
                                Manage your workforce with rhythm
                            </h1>

                            <p className="hero-copy">
                                A glowing dashboard built for fast HR decisions,
                                beautiful team tracking, and effortless updates.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-secondary mt-2"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>

                </div>

                <div className="content-area">

                    <Sidebar role={role} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />

                    <div className={`dashboard-grid ${role === "EMPLOYEE" ? "dashboard-grid--full" : ""}`}>

                    {

                        (role === "ADMIN" ||
                         role === "HR") && (

                            <AddEmployee

                                selectedEmployee={
                                    selectedEmployee
                                }

                                setRefresh={
                                    setRefresh
                                }

                                refresh={refresh}

                                role={role}

                            />

                        )

                    }
                    <EmployeeList

                        role={role}

                        setSelectedEmployee={
                            setSelectedEmployee
                        }

                        refresh={refresh}

                    />

                    </div>

                </div>

                <div className="dashboard-chatbot">
                    <ChatBot />
                </div>

                <div className="dashboard-settings" id="settings">
                    <div className="section-title">Settings</div>
                    <p className="hero-copy">
                        Adjust dashboard preferences, notification options, and user settings here.
                    </p>
                </div>

            </div>

        </div>
    );

    return isAuthenticated ? dashboard : (
        <Login
            setIsLoggedIn={setIsLoggedIn}
            setRole={setRole}
        />
    );
}

export default App;