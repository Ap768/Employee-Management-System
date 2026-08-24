import { useEffect, useState } from "react";
import "../styles/AttendanceCalendar.css";
import { getAttendanceHistory } from "../services/attendanceService";


function AttendanceCalendar() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedAttendance, setSelectedAttendance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const email = localStorage.getItem("email");

    useEffect(() => {
        loadAttendanceHistory();
    }, []);

    const loadAttendanceHistory = async () => {
        if (!email) return;

        try {
            setLoading(true);
            const response = await getAttendanceHistory(email);
            setAttendanceHistory(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Failed to load attendance history", error);
            setAttendanceHistory([]);
        } finally {
            setLoading(false);
        }
    };
    

    const weekDays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayIndex = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const dates = Array.from(
        { length: daysInMonth },
        (_, index) => {
            const day = index + 1;
            const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const record = attendanceHistory.find((item) => item.date === date);

            return {
                day,
                status: record?.status?.toUpperCase() || ""
            };
        }
    );

    const handleDateClick = (day) => {
        const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const match = attendanceHistory.find((item) => item.date === date);

        if (match) {
            setSelectedAttendance(match);
        } else {
            setSelectedAttendance(null);
            alert("No attendance found for this date.");
        }
    };

    function previousMonth() {

        setCurrentDate(

            new Date(

                currentDate.getFullYear(),
                currentDate.getMonth() - 1,
                1

            )

        );

    }

    function nextMonth() {

        setCurrentDate(

            new Date(

                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                1

            )

        );

    }

    return (

        <div className="attendance-calendar-page">

            <h2 className="calendar-title">

                Attendance Calendar

            </h2>

            {/* Summary */}

            <div className="summary-container">

                <div className="summary-box present">

                    <h5>Present</h5>

                    <h2>20</h2>

                </div>

                <div className="summary-box leave">

                    <h5>Leave</h5>

                    <h2>2</h2>

                </div>

                <div className="summary-box holiday">

                    <h5>Holiday</h5>

                    <h2>3</h2>

                </div>

                <div className="summary-box absent">

                    <h5>Absent</h5>

                    <h2>1</h2>

                </div>

            </div>

            {/* Month Header */}

            <div className="month-header">

                <button onClick={previousMonth}>

                    &lt;

                </button>

                <h3>

                    {currentDate.toLocaleString("default", {

                        month: "long",

                        year: "numeric"

                    })}

                </h3>

                <button onClick={nextMonth}>

                    &gt;

                </button>

            </div>

            {/* Week Header */}

            <div className="week-header">

                {

                    weekDays.map(day => (

                        <div key={day}>

                            {day}

                        </div>

                    ))

                }

            </div>

            {/* Calendar */}

            <div className="calendar-grid">

                {

                    Array.from({ length: firstDayIndex }).map((_, index) => (

                        <div
                            key={`blank-${index}`}
                            className="calendar-empty"
                        />

                    ))

                }

                {

                    dates.map(date => {
                        const statusClass = date.status === "PRESENT"
                            ? "present"
                            : date.status === "ABSENT"
                                ? "absent"
                                : date.status === "LEAVE"
                                    ? "leave"
                                    : date.status === "HOLIDAY"
                                        ? "holiday"
                                        : "";

                        return (
                            <div
                                key={date.day}
                                className={`calendar-day ${statusClass}`.trim()}
                                onClick={() => handleDateClick(date.day)}
                            >
                                <span className="date-number">
                                    {date.day}
                                </span>
                            </div>
                        );
                    })

                }

            </div>

            {selectedAttendance && (
                <div className="calendar-details-card">
                    <div className="details-header">
                        <h4>Selected Day Details</h4>
                        <button className="clear-button" onClick={() => setSelectedAttendance(null)}>✕</button>
                    </div>
                    <div className="details-content">
                        <div className="detail-item">
                            <span className="detail-label">📅 Date:</span>
                            <span className="detail-value">{selectedAttendance.date}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">📊 Status:</span>
                            <span className={`detail-value status-${selectedAttendance.status?.toLowerCase()}`}>{selectedAttendance.status}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">🕐 Check-in:</span>
                            <span className="detail-value">{selectedAttendance.checkInTime || "N/A"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">🕑 Check-out:</span>
                            <span className="detail-value">{selectedAttendance.checkOutTime || "N/A"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">⏱️ Working Hours:</span>
                            <span className="detail-value">{selectedAttendance.workingHours || "N/A"}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Legend */}

            <div className="calendar-legend">

                <span>🟢 Present</span>

                <span>🔴 Absent</span>

                <span>🟡 Holiday</span>

                <span>🟣 Leave</span>

                <span>⚪ Weekly Off</span>

            </div>

        </div>

    );

}

export default AttendanceCalendar;