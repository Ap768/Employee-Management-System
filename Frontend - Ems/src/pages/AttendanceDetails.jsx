import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./attendance.css";
import {
    fetchAttendanceHistory,
    fetchEmployeesAttendanceByDate,
    clearError
} from "../store/slices/attendanceSlice";

function AttendanceDetails({ role }) {

    const dispatch = useDispatch();
    const email = localStorage.getItem("email");
    const isManagementRole = role === "ADMIN" || role === "HR";

    // Redux State
    const { history, allEmployeesAttendance, loading, error } = useSelector(
        state => state.attendance
    );

    // Local State
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [sortConfig, setSortConfig] = useState({
        field: "date",
        direction: "desc"
    });
    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: "",
        endDate: ""
    });
    const [viewMode, setViewMode] = useState("list"); // list or calendar

    // Fetch attendance data based on role
    useEffect(() => {
        if (isManagementRole) {
            const today = new Date().toISOString().split('T')[0];
            dispatch(fetchEmployeesAttendanceByDate(today));
        } else {
            dispatch(fetchAttendanceHistory(email));
        }
    }, [email, isManagementRole, dispatch]);

    // Clear error on component unmount
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    // Determine which data to use
    const attendanceData = isManagementRole ? allEmployeesAttendance : history;

    // Filter and sort data
    const filteredData = useMemo(() => {
        let filtered = [...attendanceData];

        // Filter by status
        if (filterStatus !== "ALL") {
            filtered = filtered.filter(item => item.status === filterStatus);
        }

        // Filter by date range
        if (selectedDateRange.startDate && selectedDateRange.endDate) {
            const startDate = new Date(selectedDateRange.startDate);
            const endDate = new Date(selectedDateRange.endDate);
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.date || item.attendanceDate);
                return itemDate >= startDate && itemDate <= endDate;
            });
        }

        // Sort data
        if (sortConfig.field) {
            filtered.sort((a, b) => {
                let aValue = a[sortConfig.field];
                let bValue = b[sortConfig.field];

                // Handle date fields
                if (sortConfig.field === "date" || sortConfig.field === "attendanceDate") {
                    aValue = new Date(aValue || 0);
                    bValue = new Date(bValue || 0);
                }

                // Handle time fields
                if (sortConfig.field === "checkInTime" || sortConfig.field === "checkOutTime") {
                    aValue = new Date(`1970-01-01 ${aValue || "00:00"}`) || 0;
                    bValue = new Date(`1970-01-01 ${bValue || "00:00"}`) || 0;
                }

                if (aValue < bValue) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        return filtered;
    }, [attendanceData, filterStatus, selectedDateRange, sortConfig]);

    // Calculate statistics
    const statistics = useMemo(() => {
        const stats = {
            totalDays: attendanceData.length,
            presentDays: attendanceData.filter(item => item.status === "PRESENT").length,
            absentDays: attendanceData.filter(item => item.status === "ABSENT").length,
            halfDays: attendanceData.filter(item => item.status === "HALF_DAY").length,
            averageHours: 0
        };

        // Calculate average working hours
        const workingDays = attendanceData.filter(item => item.status === "PRESENT" || item.status === "HALF_DAY");
        if (workingDays.length > 0) {
            let totalHours = 0;
            workingDays.forEach(day => {
                if (day.checkInTime && day.checkOutTime) {
                    const checkIn = new Date(`1970-01-01 ${day.checkInTime}`);
                    const checkOut = new Date(`1970-01-01 ${day.checkOutTime}`);
                    const hours = (checkOut - checkIn) / (1000 * 60 * 60);
                    totalHours += hours;
                }
            });
            stats.averageHours = (totalHours / workingDays.length).toFixed(2);
        }

        return stats;
    }, [attendanceData]);

    // Format date
    function formatDate(date) {
        if (!date) return "-";
        return new Date(date).toLocaleDateString();
    }

    // Format time
    function formatTime(time) {
        if (!time) return "-";
        return new Date(`1970-01-01 ${time}`).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    // Get status badge color
    function getStatusBadgeClass(status) {
        switch (status) {
            case "PRESENT":
                return "bg-success";
            case "ABSENT":
                return "bg-danger";
            case "HALF_DAY":
                return "bg-warning text-dark";
            default:
                return "bg-secondary";
        }
    }

    // Handle sort
    function handleSort(field) {
        setSortConfig(prev => ({
            field,
            direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc"
        }));
    }

    // Handle filter reset
    function handleReset() {
        setFilterStatus("ALL");
        setSelectedDateRange({ startDate: "", endDate: "" });
        setSortConfig({ field: "date", direction: "desc" });
    }

    // Show loading state
    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3">Loading Attendance Details...</p>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="container-fluid page-fullwidth attendance-page">
                <h2 className="mb-4 fw-bold">Attendance Details</h2>
                <div className="alert alert-warning">
                    {error || "Attendance data is unavailable."}
                </div>
            </div>
        );
    }

    // Management role message
    if (isManagementRole && allEmployeesAttendance.length === 0) {
        return (
            <div className="container-fluid page-fullwidth attendance-page">
                <h2 className="mb-4 fw-bold">Attendance Details</h2>
                <div className="alert alert-info">
                    Select a date to view all employees' attendance for that date.
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid page-fullwidth attendance-page">

            {/* Header */}
            <div className="mb-4">
                <h2 className="fw-bold mb-1">Attendance Details</h2>
                <p className="text-muted">View and manage attendance records</p>
            </div>

            {/* Statistics Cards */}
            <div className="row mb-4">
                <div className="col-md-6 col-lg-3 mb-3">
                    <div className="card attendance-card summary-card checkin-card">
                        <h6 className="mb-0">Total Days</h6>
                        <h3>{statistics.totalDays}</h3>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-3">
                    <div className="card attendance-card summary-card present-card">
                        <h6 className="mb-0">Present Days</h6>
                        <h3>{statistics.presentDays}</h3>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-3">
                    <div className="card attendance-card summary-card checkout-card">
                        <h6 className="mb-0">Absent Days</h6>
                        <h3>{statistics.absentDays}</h3>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-3">
                    <div className="card attendance-card summary-card hours-card">
                        <h6 className="mb-0">Avg Hours/Day</h6>
                        <h3>{statistics.averageHours}</h3>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card attendance-card mb-4">
                <div className="card-body">
                    <h5 className="card-title mb-3">Filters</h5>
                    <div className="row g-3">
                        {/* Status Filter */}
                        <div className="col-md-4">
                            <label className="form-label fw-bold">Status</label>
                            <select
                                className="form-select"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="ALL">All Status</option>
                                <option value="PRESENT">Present</option>
                                <option value="ABSENT">Absent</option>
                                <option value="HALF_DAY">Half Day</option>
                            </select>
                        </div>

                        {/* Start Date Filter */}
                        <div className="col-md-4">
                            <label className="form-label fw-bold">From Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={selectedDateRange.startDate}
                                onChange={(e) => setSelectedDateRange(prev => ({
                                    ...prev,
                                    startDate: e.target.value
                                }))}
                            />
                        </div>

                        {/* End Date Filter */}
                        <div className="col-md-4">
                            <label className="form-label fw-bold">To Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={selectedDateRange.endDate}
                                onChange={(e) => setSelectedDateRange(prev => ({
                                    ...prev,
                                    endDate: e.target.value
                                }))}
                            />
                        </div>
                    </div>

                    {/* Reset Button */}
                    <div className="mt-3">
                        <button
                            className="btn btn-secondary"
                            onClick={handleReset}
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="card attendance-card">
                <div className="card-body">
                    <h5 className="card-title mb-3">Attendance Records</h5>

                    {filteredData.length === 0 ? (
                        <div className="alert alert-info mb-0">
                            No attendance records found for the selected filters.
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover attendance-table">
                                <thead>
                                    <tr className="bg-light">
                                        <th
                                            onClick={() => handleSort("date")}
                                            style={{ cursor: "pointer" }}
                                            className="fw-bold"
                                        >
                                            Date
                                            {sortConfig.field === "date" && (
                                                <span className="ms-2">
                                                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                                                </span>
                                            )}
                                        </th>
                                        <th
                                            onClick={() => handleSort("status")}
                                            style={{ cursor: "pointer" }}
                                            className="fw-bold"
                                        >
                                            Status
                                            {sortConfig.field === "status" && (
                                                <span className="ms-2">
                                                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                                                </span>
                                            )}
                                        </th>
                                        <th
                                            onClick={() => handleSort("checkInTime")}
                                            style={{ cursor: "pointer" }}
                                            className="fw-bold"
                                        >
                                            Check-In
                                            {sortConfig.field === "checkInTime" && (
                                                <span className="ms-2">
                                                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                                                </span>
                                            )}
                                        </th>
                                        <th
                                            onClick={() => handleSort("checkOutTime")}
                                            style={{ cursor: "pointer" }}
                                            className="fw-bold"
                                        >
                                            Check-Out
                                            {sortConfig.field === "checkOutTime" && (
                                                <span className="ms-2">
                                                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                                                </span>
                                            )}
                                        </th>
                                        <th className="fw-bold">Working Hours</th>
                                        {isManagementRole && <th className="fw-bold">Employee Email</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((record, index) => {
                                        const checkInTime = new Date(`1970-01-01 ${record.checkInTime || "00:00"}`);
                                        const checkOutTime = new Date(`1970-01-01 ${record.checkOutTime || "00:00"}`);
                                        const workingHours = record.checkInTime && record.checkOutTime
                                            ? ((checkOutTime - checkInTime) / (1000 * 60 * 60)).toFixed(2)
                                            : "-";

                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {formatDate(record.date || record.attendanceDate)}
                                                </td>
                                                <td>
                                                    <span className={`badge status-badge ${getStatusBadgeClass(record.status)}`}>
                                                        {record.status}
                                                    </span>
                                                </td>
                                                <td>{formatTime(record.checkInTime)}</td>
                                                <td>{formatTime(record.checkOutTime)}</td>
                                                <td>{workingHours} hrs</td>
                                                {isManagementRole && <td>{record.employeeEmail || record.email || "-"}</td>}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Summary Footer */}
            <div className="mt-4 text-muted">
                <p className="small">
                    Showing {filteredData.length} of {attendanceData.length} records
                </p>
            </div>
        </div>
    );
}

export default AttendanceDetails;
