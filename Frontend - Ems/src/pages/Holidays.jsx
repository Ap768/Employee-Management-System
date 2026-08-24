import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingHolidays } from "../store/slices/holidaySlice";
import { toast } from "react-toastify";
import "./holidays.css";

function Holidays() {

    const dispatch = useDispatch();
    const { upcomingHolidays: holidays, loading } = useSelector(
        state => state.holiday
    );

    useEffect(() => {

        dispatch(fetchUpcomingHolidays());

    }, [dispatch]);

    function getDaysUntil(holidayDate) {

        const today = new Date();

        const holiday = new Date(holidayDate);

        const diffTime = holiday - today;

        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays : 0;

    }

    if (loading) {

        return (

            <div className="loading-container">

                <div className="spinner-border text-primary"></div>

                <p className="mt-3">Loading Holidays...</p>

            </div>

        );

    }

    function getDateFormatted(date) {
        return new Date(date).toLocaleDateString("en-GB");
    }

    return (

        <div className="holidays-page">

            <div className="page-header">

                <h1 className="page-title">🎉 Upcoming Holidays</h1>

                <p className="page-subtitle">Plan your time with company holidays</p>

            </div>


            <div className="stats-section">

                <div className="stat-card">

                    <div className="stat-number">{holidays.length}</div>

                    <div className="stat-label">Total Holidays</div>

                </div>

                {holidays.length > 0 && (

                    <div className="stat-card">

                        <div className="stat-number">{getDaysUntil(holidays[0]?.holidayDate)}</div>

                        <div className="stat-label">Days to Next</div>

                    </div>

                )}

            </div>


            <div className="holidays-table-container">

                {holidays.length > 0 ? (

                    <table className="holidays-table">

                        <thead>

                            <tr>

                                <th>Occasion</th>

                                <th>Day</th>

                                <th>Date</th>

                                <th>Description</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {holidays.map((holiday) => (

                                <tr key={holiday.id}>

                                    <td>

                                        <span className="occasion-name">{holiday.holidayName}</span>

                                    </td>

                                    <td>

                                        <span className="day-text">{holiday.dayOfWeek}</span>

                                    </td>

                                    <td>

                                        <span className="date-text">{getDateFormatted(holiday.holidayDate)}</span>

                                    </td>

                                    <td>

                                        <span className="description-text">{holiday.description || "-"}</span>

                                    </td>

                                    <td>

                                        <span className="status-badge">
                                            {getDaysUntil(holiday.holidayDate) > 0 ? "Upcoming" : "Passed"}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                ) : (

                    <div className="empty-state">

                        <div className="empty-icon">📭</div>

                        <h4>No Upcoming Holidays</h4>

                        <p>Check back soon for upcoming holidays!</p>

                    </div>

                )}

            </div>

        </div>

    );

}

export default Holidays;