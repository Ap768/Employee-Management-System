import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";
import { getAllAttendance } from "../services/attendanceService";
import "./reports.css";

function Reports() {

    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            const employeeResponse = await getEmployees();

            const attendanceResponse = await getAllAttendance();

            setEmployees(employeeResponse.data || []);

            setAttendance(attendanceResponse.data || []);

        }

        catch (error) {

            console.error("Reports Error :", error);

        }

        finally {

            setLoading(false);

        }

    }


    const totalEmployees = employees.length;

    const presentEmployees = attendance.filter(

        item => String(item.status).toUpperCase() === "PRESENT"

    ).length;

    const absentEmployees = attendance.filter(

        item => String(item.status).toUpperCase() === "ABSENT"

    ).length;

    const halfDayEmployees = attendance.filter(

        item => String(item.status).toUpperCase() === "HALF_DAY"

    ).length;

    if (loading) {

        return (

            <div className="text-center mt-5">

                <div className="spinner-border text-primary"></div>

                <h5 className="mt-3">

                    Loading Reports...

                </h5>

            </div>

        );

    }

    return (

        <div className="container-fluid">

            <h2 className="fw-bold mb-4">

                📊 Reports Dashboard

            </h2>

            {/* Dashboard Cards */}

            <div className="row g-4">

                <div className="col-lg-3 col-md-6">

                    <div className="card bg-primary text-white shadow-lg border-0">

                        <div className="card-body text-center">

                            <h6>Total Employees</h6>

                            <h2>

                                {totalEmployees}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card bg-success text-white shadow-lg border-0">

                        <div className="card-body text-center">

                            <h6>Present</h6>

                            <h2>

                                {presentEmployees}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card bg-danger text-white shadow-lg border-0">

                        <div className="card-body text-center">

                            <h6>Absent</h6>

                            <h2>

                                {absentEmployees}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card bg-warning text-dark shadow-lg border-0">

                        <div className="card-body text-center">

                            <h6>Half Day</h6>

                            <h2>

                                {halfDayEmployees}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* Charts */}

          <div className="row mt-5">

    <div className="col-lg-6 mb-4">

        <AttendancePieChart
            attendance={attendance}
        />

    </div>

    <div className="col-lg-6 mb-4">

        <DepartmentBarChart
            employees={employees}
        />

    </div>

</div>

<div className="row">

    <div className="col-12">

        <MonthlyAttendanceChart
            attendance={attendance}
        />

    </div>

</div>
        </div>

    );

}

export default Reports;