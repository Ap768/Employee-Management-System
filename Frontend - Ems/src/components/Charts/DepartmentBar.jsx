import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function DepartmentBarChart({ employees }) {

    // Count employees department-wise
    const departmentCounts = {};

    employees.forEach((employee) => {

        const department = employee.department || "Unknown";

        departmentCounts[department] =
            (departmentCounts[department] || 0) + 1;

    });

    const labels = Object.keys(departmentCounts);

    const values = Object.values(departmentCounts);

    const data = {

        labels,

        datasets: [

            {

                label: "Employees",

                data: values,

                backgroundColor: [

                    "#0d6efd",
                    "#198754",
                    "#ffc107",
                    "#dc3545",
                    "#6f42c1",
                    "#20c997",
                    "#fd7e14"

                ],

                borderRadius: 8

            }

        ]

    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                display: false

            },

            title: {

                display: true,

                text: "Employees by Department",

                font: {

                    size: 18,

                    weight: "bold"

                }

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

                <Bar

                    data={data}

                    options={options}

                />

            </div>

        </div>

    );

}

export default DepartmentBarChart;