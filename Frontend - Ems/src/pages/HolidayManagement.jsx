import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
    fetchAllHolidays,
    createNewHoliday,
    updateExistingHoliday,
    removeHoliday
} from "../store/slices/holidaySlice";
import "./holiday-management.css";

function HolidayManagement() {

    const dispatch = useDispatch();

    const { holidays, loading } = useSelector(state => state.holiday);

    const [holidayName, setHolidayName] = useState("");

    const [holidayDate, setHolidayDate] = useState("");

    const [dayOfWeek, setDayOfWeek] = useState("");

    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        dispatch(fetchAllHolidays());

    }, [dispatch]);

    async function handleSave(e) {

        e.preventDefault();

        if (!holidayName || !holidayDate || !dayOfWeek) {

            toast.error("Please fill all required fields");

            return;

        }

        const holiday = {

            holidayName,
            holidayDate,
            dayOfWeek,
            description

        };

        try {

            if (editingId === null) {

                await dispatch(createNewHoliday(holiday));

                toast.success("Holiday Added Successfully");

            }

            else {

                await dispatch(updateExistingHoliday({ id: editingId, data: holiday }));

                toast.success("Holiday Updated Successfully");

            }

            clearForm();

            dispatch(fetchAllHolidays());

        }

        catch (error) {

            console.error(error);

            toast.error("Operation Failed");

        }

    }

    function handleEdit(holiday) {

        setEditingId(holiday.id);

        setHolidayName(holiday.holidayName);

        setHolidayDate(holiday.holidayDate);

        setDayOfWeek(holiday.dayOfWeek);

        setDescription(holiday.description);

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this holiday?"

        );

        if (!confirmDelete) {

            return;

        }

        try {

            await dispatch(removeHoliday(id));

            toast.success("Holiday Deleted Successfully");

            dispatch(fetchAllHolidays());

        }

        catch (error) {

            console.error(error);

            toast.error("Delete Failed");

        }

    }

    function clearForm() {

        setEditingId(null);

        setHolidayName("");

        setHolidayDate("");

        setDayOfWeek("");

        setDescription("");

    }

    if (loading) {

        return (

            <div className="loading-container">

                <div className="spinner-border text-primary"></div>

                <p className="mt-3">Loading Holiday Management...</p>

            </div>

        );

    }

    return (

        <div className="holiday-management-page">


            <div className="page-header">

                <h1 className="page-title">🎉 Holiday Management</h1>

                <p className="page-subtitle">Add, update, and manage company holidays</p>

            </div>


            <div className="form-card">

                <div className="form-header">

                    <h5 className="form-title">

                        {editingId === null ? "➕ Add New Holiday" : "✏️ Edit Holiday"}

                    </h5>

                </div>

                <form onSubmit={handleSave} className="holiday-form">

                    <div className="form-grid">

                        <div className="form-group">

                            <label className="form-label">

                                Holiday Name <span className="required">*</span>

                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="e.g., Independence Day"
                                value={holidayName}
                                onChange={(e) =>
                                    setHolidayName(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label className="form-label">

                                Holiday Date <span className="required">*</span>

                            </label>

                            <input
                                type="date"
                                className="form-control"
                                value={holidayDate}
                                onChange={(e) =>
                                    setHolidayDate(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label className="form-label">

                                Day Of Week <span className="required">*</span>

                            </label>

                            <select
                                className="form-control"
                                value={dayOfWeek}
                                onChange={(e) =>
                                    setDayOfWeek(e.target.value)
                                }
                                required
                            >

                                <option value="">-- Select Day --</option>

                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label className="form-label">Description</label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="e.g., National Festival"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className="form-actions">

                        <button type="submit" className="btn btn-primary">

                            {editingId === null ? "💾 Save Holiday" : "✏️ Update Holiday"}

                        </button>

                        {editingId !== null && (

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={clearForm}
                            >

                                ❌ Cancel

                            </button>

                        )}

                    </div>

                </form>

            </div>

            {/* Holiday List */}

            <div className="list-card">

                <div className="list-header">

                    <h5 className="list-title">

                        📋 Holiday List ({holidays.length})

                    </h5>

                </div>

                <div className="list-content">

                    {holidays.length > 0 ? (

                        <div className="table-wrapper">

                            <table className="holidays-table">

                                <thead>

                                    <tr>

                                        <th>Holiday</th>

                                        <th>Date</th>

                                        <th>Day</th>

                                        <th>Description</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {holidays.map((holiday) => (

                                        <tr key={holiday.id}>

                                            <td className="holiday-name-cell">

                                                🎉 {holiday.holidayName}

                                            </td>

                                            <td>

                                                {new Date(holiday.holidayDate).toLocaleDateString("en-US", {

                                                    year: "numeric",

                                                    month: "short",

                                                    day: "numeric"

                                                })}

                                            </td>

                                            <td>

                                                <span className="day-badge">

                                                    {holiday.dayOfWeek}

                                                </span>

                                            </td>

                                            <td className="description-cell">

                                                {holiday.description || "—"}

                                            </td>

                                            <td className="actions-cell">

                                                <button
                                                    className="action-btn edit-btn"
                                                    onClick={() =>

                                                        handleEdit(holiday)

                                                    }
                                                    title="Edit"
                                                >

                                                    ✏️

                                                </button>

                                                <button
                                                    className="action-btn delete-btn"
                                                    onClick={() =>

                                                        handleDelete(holiday.id)

                                                    }
                                                    title="Delete"
                                                >

                                                    🗑️

                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    ) : (

                        <div className="empty-state">

                            <div className="empty-icon">📭</div>

                            <h5>No Holidays Found</h5>

                            <p>Create your first holiday to get started!</p>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default HolidayManagement;
