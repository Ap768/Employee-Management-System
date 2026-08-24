import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import { fetchEmployees } from "../store/slices/employeeSlice";
import { fetchUpcomingHolidays } from "../store/slices/holidaySlice";
import { Building2, CalendarDays, UserPlus, Users } from "lucide-react";
import "./Dashboard.css";

function Dashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { employees = [], loading: employeeLoading } = useSelector((state) => state.employee);
    const { upcomingHolidays = [], loading: holidayLoading } = useSelector((state) => state.holiday);

    useEffect(() => {
        dispatch(fetchEmployees(0));
        dispatch(fetchUpcomingHolidays());
    }, [dispatch]);

    const departmentStats = useMemo(() => {
        const counts = {};

        employees.forEach((employee) => {
            const department = employee?.department?.trim();
            if (!department) return;
            counts[department] = (counts[department] || 0) + 1;
        });

        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }, [employees]);

    const totalDepartments = departmentStats.length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const newEmployeesThisMonth = useMemo(() => {
        return employees.filter((employee) => {
            const candidateDate =
                employee?.createdAt ||
                employee?.createdDate ||
                employee?.dateCreated ||
                employee?.created_on ||
                employee?.createdAtDate;

            if (!candidateDate) return false;

            const date = new Date(candidateDate);

            if (Number.isNaN(date.getTime())) return false;

            return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
        }).length;
    }, [employees, currentMonth, currentYear]);

    const upcomingHolidayList = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return [...upcomingHolidays]
            .filter((holiday) => {
                const holidayDate = new Date(holiday?.holidayDate || holiday?.date || holiday?.holiday_date);
                if (Number.isNaN(holidayDate.getTime())) return false;
                return holidayDate >= today;
            })
            .sort((a, b) => new Date(a?.holidayDate || a?.date || a?.holiday_date) - new Date(b?.holidayDate || b?.date || b?.holiday_date))
            .slice(0, 5);
    }, [upcomingHolidays]);

    const recentEmployees = useMemo(() => {
        return [...employees]
            .sort((a, b) => {
                const dateA = new Date(a?.createdAt || a?.createdDate || a?.dateCreated || 0).getTime();
                const dateB = new Date(b?.createdAt || b?.createdDate || b?.dateCreated || 0).getTime();
                return dateB - dateA;
            })
            .slice(0, 5);
    }, [employees]);

    const maxDepartmentEmployees = Math.max(...departmentStats.map((dept) => dept.count), 1);

    const loading = employeeLoading || holidayLoading;

    if (loading && employees.length === 0 && upcomingHolidays.length === 0) {
        return (
            <div className="loading-container">
                <div className="spinner-border loading-spinner" role="status"></div>
                <p className="loading-text">Loading Dashboard...</p>
            </div>
        );
    }

    return (

        <div className="dashboard-page-container">

            <div className="dashboard-page-header">

                <h1 className="dashboard-title">Dashboard</h1>

                <p className="dashboard-subtitle">Welcome to your attendance & leave management system</p>

            </div>

            <div className="dashboard-stats">

                <div className="dashboard-card-wrapper">
                    <DashboardCard
                        title="Total Employees"
                        value={employees.length}
                        icon={<Users size={20} aria-hidden="true" />}
                        bgColor="#3b82f6"
                        statusType="employees"
                    />
                </div>

                <div className="dashboard-card-wrapper">
                    <DashboardCard
                        title="Total Departments"
                        value={totalDepartments}
                        icon={<Building2 size={20} aria-hidden="true" />}
                        bgColor="#8b5cf6"
                        statusType="employees"
                    />
                </div>

                <div className="dashboard-card-wrapper">
                    <DashboardCard
                        title="New Employees"
                        value={newEmployeesThisMonth}
                        icon={<UserPlus size={20} aria-hidden="true" />}
                        bgColor="#10b981"
                        statusType="employees"
                    />
                </div>

                <div className="dashboard-card-wrapper">
                    <DashboardCard
                        title="Upcoming Holidays"
                        value={upcomingHolidayList.length}
                        icon={<CalendarDays size={20} aria-hidden="true" />}
                        bgColor="#f59e0b"
                        statusType="employees"
                    />
                </div>

            </div>

            <div className="dashboard-sections">

                <section className="dashboard-panel">
                    <div className="panel-header">
                        <h3>Departments</h3>
                    </div>

                    <div className="department-list">
                        {departmentStats.length > 0 ? (
                            departmentStats.map((department) => {
                                const percent = (department.count / maxDepartmentEmployees) * 100;

                                return (
                                    <div key={department.name} className="department-row">
                                        <div className="department-label-row">
                                            <span className="department-name">{department.name}</span>
                                            <span className="department-count">{department.count} Employees</span>
                                        </div>

                                        <div className="department-progress-track">
                                            <div
                                                className="department-progress-bar"
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="empty-state">No department data available.</p>
                        )}
                    </div>

                    <button className="dashboard-link" onClick={() => navigate("/employees")} type="button">
                        View All Employees →
                    </button>
                </section>

                <section className="dashboard-panel">
                    <div className="panel-header">
                        <h3>Upcoming Holidays</h3>
                    </div>

                    <div className="holiday-list">
                        {upcomingHolidayList.length > 0 ? (
                            upcomingHolidayList.map((holiday) => {
                                const holidayDate = new Date(holiday?.holidayDate || holiday?.date || holiday?.holiday_date);
                                const formattedDate = holidayDate.toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                });
                                const dayName = holidayDate.toLocaleDateString("en-US", { weekday: "long" });

                                return (
                                    <div key={holiday.id || `${holiday.name}-${formattedDate}`} className="holiday-item">
                                        <div className="holiday-name">{holiday.name || holiday.holidayName}</div>
                                        <div className="holiday-meta">{formattedDate} · {dayName}</div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="empty-state">No upcoming holidays.</p>
                        )}
                    </div>

                    <button className="dashboard-link" onClick={() => navigate("/holidays")} type="button">
                        View All Holidays →
                    </button>
                </section>

            </div>

            <section className="dashboard-panel dashboard-panel-wide">
                <div className="panel-header">
                    <h3>Recent Employees</h3>
                </div>

                <div className="recent-employees-table">
                    <div className="recent-header-row">
                        <span>Name</span>
                        <span>Email</span>
                        <span>Department</span>
                        <span>Salary</span>
                    </div>

                    {recentEmployees.length > 0 ? (
                        recentEmployees.map((employee) => (
                            <div key={employee.id} className="recent-row">
                                <span>{employee.name}</span>
                                <span>{employee.email}</span>
                                <span>{employee.department}</span>
                                <span>₹{Number(employee.salary || 0).toLocaleString()}</span>
                            </div>
                        ))
                    ) : (
                        <p className="empty-state">No recent employees found.</p>
                    )}
                </div>

                <button className="dashboard-link" onClick={() => navigate("/employees")} type="button">
                    View All Employees →
                </button>
            </section>

        </div>

    );

}

export default Dashboard;