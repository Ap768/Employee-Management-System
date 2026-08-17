import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function MonthlyAttendanceChart({ attendance = [] }) {

    const safeAttendance = Array.isArray(attendance)
        ? attendance
        : [];

    // Month Names
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    // Count attendance by month
    const monthCount = {};

    safeAttendance.forEach((item) => {

        if (!item.date) return;

        const month = new Date(item.date).getMonth();

        const monthName = monthNames[month];

        monthCount[monthName] =
            (monthCount[monthName] || 0) + 1;

    });

    // Ensure all months are shown
    const labels = monthNames;

    const values = labels.map(
        month => monthCount[month] || 0
    );

    const data = {

        labels,

        datasets: [

            {

                label: "Attendance",

                data: values,

                borderColor: "#0d6efd",

                backgroundColor: "rgba(13,110,253,0.2)",

                fill: true,

                tension: 0.4,

                pointRadius: 5,

                pointHoverRadius: 8

            }

        ]

    };

    const options = {

        responsive: true,

        maintainAspectRatio: true,

        plugins: {

            title: {

                display: true,

                text: "Monthly Attendance Trend",

                font: {

                    size: 18,

                    weight: "bold"

                }

            },

            legend: {

                display: true,

                position: "bottom"

            }

        },

        scales: {

            y: {

                beginAtZero: true,

                ticks: {

                    stepSize: 1

                }

            }

        }

    };

    return (

        <div className="card shadow-lg border-0 rounded-4">

            <div className="card-body">

                <Line

                    data={data}

                    options={options}

                />

            </div>

        </div>

    );

}

export default MonthlyAttendanceChart;