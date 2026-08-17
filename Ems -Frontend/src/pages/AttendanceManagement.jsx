import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeesAttendanceByDate } from "../store/slices/attendanceSlice";
import "./attendanceManagement.css";

function AttendanceManagement() {
    const dispatch = useDispatch();
    const { allEmployeesAttendance: attendanceList, loading } = useSelector(
        state => state.attendance
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
        dispatch(fetchEmployeesAttendanceByDate(selectedDate));
    }, [selectedDate, dispatch]);

    const filteredAttendance = useMemo(() => {
        if (searchQuery.trim() === "") {
            return attendanceList;
        }

        const query = searchQuery.toLowerCase().trim();
        return attendanceList.filter((item) => {
            const name = item.employeeName?.toLowerCase() || "";
            const email = item.employeeEmail?.toLowerCase() || "";
            return name.includes(query) || email.includes(query);
        });
    }, [attendanceList, searchQuery]);

    function formatTime(time) {
        if (!time) return "--";
        return new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    function formatDate(date) {
        if (!date) return "--";
        return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    function exportToCSV() {
        if (filteredAttendance.length === 0) {
            alert("No attendance records to export.");
            return;
        }

        const headers = [
            "Employee Name",
            "Employee Email",
            "Date",
            "Check In",
            "Check Out",
            "Working Hours",
            "Status",
        ];

        const rows = filteredAttendance.map((item) => [
            item.employeeName,
            item.employeeEmail,
            formatDate(item.date),
            formatTime(item.checkInTime),
            formatTime(item.checkOutTime),
            item.workingHours || "-",
            item.status,
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map((row) =>
                row
                    .map((value) =>
                        `"${String(value ?? "").replace(/"/g, '""')}"`
                    )
                    .join(",")
            ),
        ].join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `attendance-${selectedDate}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }

    const presentCount = filteredAttendance.filter(
        (item) => item.status === "PRESENT"
    ).length;
    const absentCount = filteredAttendance.filter(
        (item) => item.status === "ABSENT"
    ).length;
    const halfDayCount = filteredAttendance.filter(
        (item) => item.status === "HALF_DAY"
    ).length;
    const totalRecords = filteredAttendance.length;

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3">Loading Attendance...</p>
            </div>
        );
    }

    return (
        <div className="container-fluid page-fullwidth attendance-management-page">
            <h2 className="fw-bold mb-4">Attendance Management</h2>

            <div className="row g-4 mb-4">
                <div className="col-lg-3 col-md-6">
                    <div className="card shadow-sm border-0 bg-success text-white">
                        <div className="card-body">
                            <h6>Present</h6>
                            <h2>{presentCount}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card shadow-sm border-0 bg-danger text-white">
                        <div className="card-body">
                            <h6>Absent</h6>
                            <h2>{absentCount}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card shadow-sm border-0 bg-warning text-dark">
                        <div className="card-body">
                            <h6>Half Day</h6>
                            <h2>{halfDayCount}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card shadow-sm border-0 bg-primary text-white">
                        <div className="card-body">
                            <h6>Total Records</h6>
                            <h2>{totalRecords}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Employee Name or Email"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            <input
                                type="date"
                                className="form-control"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            <button
                                className="btn btn-secondary w-100"
                                onClick={() => setSearchQuery("")}
                            >
                                Clear Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-end mb-3">
                <button className="btn btn-success" onClick={exportToCSV}>
                    📥 Export CSV
                </button>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="mb-4">Attendance Records</h4>
                    <div className="table-responsive">
                        <table className="table table-hover table-striped align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Employee</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>Working Hours</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAttendance.length > 0 ? (
                                    filteredAttendance.map((attendance, index) => (
                                        <tr
                                            key={
                                                attendance.employeeId ||
                                                attendance.id ||
                                                index
                                            }
                                        >
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div
                                                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {attendance.employeeName
                                                            ? attendance.employeeName
                                                                  .charAt(0)
                                                                  .toUpperCase()
                                                            : "-"}
                                                    </div>
                                                    <div>{attendance.employeeName}</div>
                                                </div>
                                            </td>
                                            <td>{attendance.employeeEmail}</td>
                                            <td>{formatDate(attendance.date)}</td>
                                            <td>{formatTime(attendance.checkInTime)}</td>
                                            <td>{formatTime(attendance.checkOutTime)}</td>
                                            <td>{attendance.workingHours || "-"}</td>
                                            <td>
                                                <span
                                                    className={`badge ${
                                                        attendance.status === "PRESENT"
                                                            ? "bg-success"
                                                            : attendance.status === "ABSENT"
                                                            ? "bg-danger"
                                                            : "bg-warning text-dark"
                                                    }`}
                                                >
                                                    {attendance.status?.replace(
                                                        "_",
                                                        " "
                                                    )}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4">
                                            No Attendance Records Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttendanceManagement;
