import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./attendance.css";

import {
    fetchTodayAttendance,
    fetchAttendanceHistory,
    handleCheckIn,
    handleCheckOut,
    clearError
} from "../store/slices/attendanceSlice";

import { fetchMyLeaves } from "../store/slices/leaveSlice";
import { fetchUpcomingHolidays } from "../store/slices/holidaySlice";

function Attendance({ role }) {

    const dispatch = useDispatch();
    const isManagementRole = role === "ADMIN" || role === "HR";
    const email = localStorage.getItem("email");

    const [buttonLoading, setButtonLoading] = useState(false);

    // Redux State
    const { todayAttendance, history, loading, error } = useSelector(
        state => state.attendance
    );
    const { upcomingHolidays: holidays } = useSelector(
        state => state.holiday
    );
    const { myLeaves: leaves } = useSelector(
        state => state.leave
    );

    useEffect(() => {

        if (isManagementRole) {
            return;
        }

        dispatch(fetchTodayAttendance(email));
        dispatch(fetchAttendanceHistory(email));
        dispatch(fetchMyLeaves(email));
        dispatch(fetchUpcomingHolidays());

    }, [role, email, dispatch]);

    async function handleCheckInClick() {

        setButtonLoading(true);

        try {

            await dispatch(handleCheckIn(email));

            alert("Checked In Successfully");

            dispatch(fetchTodayAttendance(email));

        } catch (error) {

            alert("Check In Failed");

        } finally {

            setButtonLoading(false);

        }

    }

    async function handleCheckOutClick() {

        setButtonLoading(true);

        try {

            await dispatch(handleCheckOut(email));

            alert("Checked Out Successfully");

            dispatch(fetchTodayAttendance(email));

        } catch (error) {

            alert("Check Out Failed");

        } finally {

            setButtonLoading(false);

        }

    }

    function formatDate(date) {

        if (!date) return "-";

        return new Date(date).toLocaleDateString();

    }

    function formatTime(time) {

        if (!time) return "-";

        return new Date(time).toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        });

    }

    if (loading) {

        return (

            <div className="text-center mt-5">

                <div className="spinner-border text-primary"></div>

                <p className="mt-3">

                    Loading Attendance...

                </p>

            </div>

        );

    }

    if (isManagementRole) {
        return (
            <div className="container-fluid page-fullwidth attendance-page">
                <h2 className="mb-4 fw-bold">Attendance</h2>
                <div className="card attendance-card shadow-sm">
                    <div className="card-body">
                        <h4 className="card-title">Attendance overview</h4>
                        <p className="mb-0">
                            Employee check-in and check-out is available from an employee account.
                            Management attendance reports can be added here separately.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

if (error) {
    return (

        <div className="container-fluid page-fullwidth attendance-page">

            <h2 className="mb-4 fw-bold">

                Attendance

            </h2>

            <div className="alert alert-warning">

                {error || "Attendance data is unavailable."}

            </div>

        </div>

    );

}

    const daysWorked = history.filter(
        item => item.status === "PRESENT"
    ).length;

    const absentDays = history.filter(
        item => item.status === "ABSENT"
    ).length;

    const halfDays = history.filter(
        item => item.status === "HALF_DAY"
    ).length;

    const holidayCount = holidays.length;

    const approvedLeaves = leaves.filter(
        item => item.status === "APPROVED"
    ).length;

    const attendancePercentage =
        history.length === 0
            ? 0
            : (
                (daysWorked / history.length) * 100
            ).toFixed(1);

    return (

    <div className="container-fluid page-fullwidth attendance-page">

        <h2 className="mb-4 fw-bold">
            Attendance
        </h2>


        <div className="row g-4 mb-4">

<div className="col-xl-3 col-lg-6 col-md-6 mb-4">

                <div className="summary-card present-card">

                    <h6>Status</h6>

                    <h3>

                        {

                            todayAttendance ?

                                todayAttendance.status

                                :

                                "Absent"

                        }

                    </h3>

                </div>

            </div>

<div className="col-xl-3 col-lg-6 col-md-6 mb-4">

                <div className="summary-card checkin-card">

                    <h6>Check In</h6>

                    <h3>

                        {

                            todayAttendance ?

                                formatTime(todayAttendance.checkInTime)

                                :

                                "--"

                        }

                    </h3>

                </div>

            </div>

<div className="col-xl-3 col-lg-6 col-md-6 mb-4">

                <div className="summary-card checkout-card">

                    <h6>Check Out</h6>

                    <h3>

                        {

                            todayAttendance ?

                                formatTime(todayAttendance.checkOutTime)

                                :

                                "--"

                        }

                    </h3>

                </div>

            </div>

<div className="col-xl-3 col-lg-6 col-md-6 mb-4">

                <div className="summary-card hours-card">

                    <h6>Working Hours</h6>

                    <h3>

                        {

                            todayAttendance ?

                                todayAttendance.workingHours

                                :

                                "--"

                        }

                    </h3>

                </div>

            </div>

        </div>


        <div className="card attendance-card shadow-sm mb-4">

            <div className="card-body">

                <h4 className="card-title mb-4">

                    Attendance Actions

                </h4>

                <div className="d-flex gap-3 action-buttons">

                    <button

    className="btn btn-success"

    onClick={handleCheckInClick}

    disabled={

        buttonLoading ||

        (
            todayAttendance &&
            todayAttendance.checkInTime
        )

    }

>

    {

        buttonLoading

            ?

            "Please Wait..."

            :

            "Check In"

    }

</button>

                    <button

    className="btn btn-danger"

    onClick={handleCheckOutClick}

    disabled={

        buttonLoading ||

        !todayAttendance ||

        !todayAttendance.checkInTime ||

        todayAttendance.checkOutTime

    }

>

    {

        buttonLoading

            ?

            "Please Wait..."

            :

            "Check Out"

    }

</button>

                </div>

            </div>

        </div>


        <div className="mt-5">

            <h3 className="fw-bold mb-4">

                📊 Attendance Analytics

            </h3>

            <div className="row g-4">

<div className="col-xl-3 col-lg-6 col-md-6 mb-4">

                    <div className="card analytics-card shadow-sm h-100 border-0">

                        <div className="card-body text-center">

                            <h6 className="text-muted mb-2">

                                📅 Days Worked

                            </h6>

                            <h2 className="fw-bold text-primary">

                                {daysWorked}

                            </h2>

                        </div>

                    </div>

                </div>

<div className="col-xl-3 col-lg-6 col-md-6 mb-4">

                    <div className="card analytics-card shadow-sm h-100 border-0">

                        <div className="card-body text-center">

                            <h6 className="text-muted mb-2">

                                ⏳ Half Days

                            </h6>

                            <h2 className="fw-bold text-warning">

                                {halfDays}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-xl-3 col-lg-6 col-md-6 mb-4">

                    <div className="card analytics-card shadow-sm h-100 border-0">

                        <div className="card-body text-center">

                            <h6 className="text-muted mb-2">

                                ❌ Absent

                            </h6>

                            <h2 className="fw-bold text-danger">

                                {absentDays}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>


        <div className="card attendance-card shadow-sm">

            <div className="card-body">

                <h4 className="card-title mb-4">

                    Attendance History

                </h4>

                <div className="table-responsive">

                    <table className="table table-hover table-striped attendance-table">

                        <thead className="table-dark">

                            <tr>

                                <th>Date</th>

                                <th>Check In</th>

                                <th>Check Out</th>

                                <th>Working Hours</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                history.length > 0 ?

                                    history.map((attendance) => (

                                        <tr key={attendance.id}>

                                            <td>

                                                {

                                                    formatDate(
                                                        attendance.date
                                                    )

                                                }

                                            </td>

                                            <td>

                                                {

                                                    formatTime(
                                                        attendance.checkInTime
                                                    )

                                                }

                                            </td>

                                            <td>

                                                {

                                                    formatTime(
                                                        attendance.checkOutTime
                                                    )

                                                }

                                            </td>

                                            <td>

                                                {

                                                    attendance.workingHours

                                                }

                                            </td>

                                            <td>

                                                <span className="badge bg-success status-badge">

                                                    {

                                                        attendance.status

                                                    }

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    (

                                        <tr>

                                            <td

                                                colSpan="5"

                                                className="text-center py-5"

                                            >

                                                No Attendance Records Found

                                            </td>

                                        </tr>

                                    )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    </div>

);

}

export default Attendance;