import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
    hasAdminAccess,
    hasManagementAccess,
    normalizeRole
} from "./utils/roleUtils";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reports from "./pages/Reports";
import Holidays from "./pages/Holidays";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import ApplyLeave from "./pages/ApplyLeave";
import MyLeaves from "./pages/MyLeaves";
import LeaveRequests from "./pages/LeaveRequests";
import Attendance from "./pages/Attendance";
import Archive from "./pages/Archive";
import Settings from "./pages/Settings";
import AttendanceCalendar from "./pages/AttendanceCalendar.jsx";

import MainLayout from "./layouts/MainLayout";
import AttendanceManagement from "./pages/AttendanceManagement";
import HolidayManagement from "./pages/HolidayManagement";
import Offboarding from "./pages/Offboarding";
import "./api/axios";

function App() {

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(
        () => Boolean(localStorage.getItem("authToken") && localStorage.getItem("role"))
    );

    const [role, setRole] = useState(
        () => normalizeRole(localStorage.getItem("role") || "")
    );

    function handleLogout() {

        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("authToken");

        setRole("");
        setIsLoggedIn(false);

    }

    return (

        <>

            <Routes>

                {/* LOGIN */}

                <Route
                    path="/login"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Login
                                setIsLoggedIn={setIsLoggedIn}
                                setRole={setRole}
                            />
                        )
                    }
                />

                {/* MAIN LAYOUT */}

                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <MainLayout
                                role={role}
                                sidebarCollapsed={sidebarCollapsed}
                                setSidebarCollapsed={setSidebarCollapsed}
                                handleLogout={handleLogout}
                            />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                >
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route
                        path="employees"
                        element={
                            <EmployeeList
                                role={role}
                                setSelectedEmployee={setSelectedEmployee}
                                refresh={refresh}
                            />
                        }
                    />
                    {hasManagementAccess(role) && (
                        <Route
                            path="add-employee"
                            element={
                                <AddEmployee
                                    selectedEmployee={selectedEmployee}
                                    setSelectedEmployee={setSelectedEmployee}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                    role={role}
                                />
                            }
                        />
                    )}
                    {hasAdminAccess(role) && (
                        <Route
                            path="admin"
                            element={
                                <div className="p-4">
                                    <h2>Admin Panel</h2>
                                    <p>Admin-only access granted.</p>
                                </div>
                            }
                        />
                    )}
                    <Route path="apply-leave" element={<ApplyLeave />} />
                    <Route path="my-leaves" element={<MyLeaves />} />
                    <Route path="attendance" element={<Attendance role={role} />} />
                    <Route
                        path="attendance-management"
                        element={<AttendanceManagement />}
                    />
                    {hasManagementAccess(role) && (
                        <Route path="leave-requests" element={<LeaveRequests />} />
                    )}
                    {hasManagementAccess(role) && (
                        <Route path="offboarding" element={<Offboarding />} />
                    )}
                    <Route path="archive" element={<Archive />} />
                    <Route path="settings" element={<Settings />} />
                    <Route
                        path="holiday-management"
                        element={<HolidayManagement />}
                    />
                    <Route path="holidays" element={<Holidays />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="attendance-calendar" element={<AttendanceCalendar />} />
                </Route>

                {/* INVALID ROUTE */}

                <Route
                    path="*"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />


            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
            />

        </>

    );

}

export default App;