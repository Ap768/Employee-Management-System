import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from "chart.js";

import { Pie } from "react-chartjs-2";
import "./AttendancePieChart.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title
);

function AttendancePieChart({ attendance = [] }) {

    const safeAttendance = Array.isArray(attendance) ? attendance : [];

    // Calculate Attendance Counts
    const present = safeAttendance.filter(
        item => String(item?.status || "").toUpperCase() === "PRESENT"
    ).length;

    const absent = safeAttendance.filter(
        item => String(item?.status || "").toUpperCase() === "ABSENT"
    ).length;

    const halfDay = safeAttendance.filter(
        item => String(item?.status || "").toUpperCase() === "HALF_DAY"
    ).length;

    const total = safeAttendance.length;

    // Calculate Percentages
    const presentPercentage =
        total === 0 ? 0 : ((present / total) * 100).toFixed(1);

    const absentPercentage =
        total === 0 ? 0 : ((absent / total) * 100).toFixed(1);

    const halfDayPercentage =
        total === 0 ? 0 : ((halfDay / total) * 100).toFixed(1);

    const data = {

        labels: [

            "Present",
            "Absent",
            "Half Day"

        ],

        datasets: [

            {

                label: "Attendance",

                data: [

                    present,
                    absent,
                    halfDay

                ],

                backgroundColor: [

                    "#10b981",
                    "#ef4444",
                    "#f59e0b"

                ],

                borderColor: [

                    "#059669",
                    "#dc2626",
                    "#d97706"

                ],

                borderWidth: 3,
                
                hoverBorderWidth: 4

            }

        ]

    };

    const options = {

        responsive: true,

        maintainAspectRatio: true,

        plugins: {

            title: {

                display: true,

                text: "Attendance Overview",

                font: {

                    size: 20,

                    weight: "bold",
                    family: "'Segoe UI', sans-serif"

                },

                color: "#e0e7ff",

                padding: 20

            },

            legend: {

                position: "bottom",

                labels: {

                    padding: 20,

                    font: {

                        size: 14,
                        weight: "600"

                    },

                    color: "#cbd5e1",

                    generateLabels: (chart) => {
                        const data = chart.data;
                        return data.labels.map((label, index) => ({
                            text: label,
                            fillStyle: data.datasets[0].backgroundColor[index],
                            hidden: false,
                            index
                        }));
                    }

                }

            },

            tooltip: {

                backgroundColor: "rgba(15, 23, 42, 0.95)",

                titleColor: "#e0e7ff",

                bodyColor: "#cbd5e1",

                borderColor: "rgba(96, 165, 250, 0.3)",

                borderWidth: 1,

                padding: 12,

                cornerRadius: 8

            }

        }

    };

    return (

        <div className="attendance-pie-chart-container">

            <div className="chart-inner">

                <h3 className="chart-title">

                    Attendance Analytics

                </h3>

                <p className="chart-subtitle">

                    Total Attendance Records : <strong>{total}</strong>

                </p>

                <div className="pie-chart-wrapper">

                    <Pie

                        data={data}

                        options={options}

                    />

                </div>

                <hr className="chart-divider" />

                <div className="attendance-stats">

                    <div className="stat-item stat-present">

                        <div className="stat-indicator"></div>

                        <div className="stat-info">

                            <h6>Present</h6>

                            <div className="stat-values">

                                <h5>{present}</h5>

                                <small>{presentPercentage}%</small>

                            </div>

                        </div>

                    </div>

                    <div className="stat-item stat-absent">

                        <div className="stat-indicator"></div>

                        <div className="stat-info">

                            <h6>Absent</h6>

                            <div className="stat-values">

                                <h5>{absent}</h5>

                                <small>{absentPercentage}%</small>

                            </div>

                        </div>

                    </div>

                    <div className="stat-item stat-halfday">

                        <div className="stat-indicator"></div>

                        <div className="stat-info">

                            <h6>Half Day</h6>

                            <div className="stat-values">

                                <h5>{halfDay}</h5>

                                <small>{halfDayPercentage}%</small>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AttendancePieChart;