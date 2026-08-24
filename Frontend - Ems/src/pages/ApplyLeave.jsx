import { useState } from "react";
import { applyLeave } from "../services/leaveService";
import { toast } from "react-toastify";
import "./ApplyLeave.css";

function ApplyLeave() {

    const [leave, setLeave] = useState({

        leaveType: "CASUAL",
        fromDate: "",
        toDate: "",
        reason: ""

    });

    function handleChange(e) {

        setLeave({

            ...leave,

            [e.target.name]: e.target.value

        });

    }

    function submitLeave(e) {

        e.preventDefault();

        if (
            !leave.fromDate ||
            !leave.toDate ||
            !leave.reason
        ) {

toast.warning("Please fill all fields");
            return;

        }

       const leaveRequest = {

    employeeEmail: localStorage.getItem("email"),

    leaveType: leave.leaveType,

    fromDate: leave.fromDate,

    toDate: leave.toDate,

    reason: leave.reason

};

        applyLeave(leaveRequest)

            .then(() => {

                alert("Leave Applied Successfully");

                setLeave({

                    leaveType: "CASUAL",

                    fromDate: "",

                    toDate: "",

                    reason: ""

                });

            })

            .catch((error) => {

                console.log(error);

toast.error("Unable to apply leave.");
            });

    }

    return (

        <div className="apply-leave-container">

            <div className="apply-leave-header">

                <h1 className="apply-leave-title">Apply Leave</h1>

                <p className="apply-leave-subtitle">Submit your leave request for management approval</p>

            </div>

            <form onSubmit={submitLeave} className="apply-leave-form">

                <div className="form-group">

                    <label className="form-label">Leave Type <span className="required">*</span></label>

                    <select
                        className="form-input form-select"
                        name="leaveType"
                        value={leave.leaveType}
                        onChange={handleChange}
                    >
                        <option value="CASUAL">Casual Leave</option>
                        <option value="SICK">Sick Leave</option>
                        <option value="EARNED">Earned Leave</option>
                        <option value="UNPAID">Unpaid Leave</option>
                    </select>

                </div>

                <div className="form-row">

                    <div className="form-group">

                        <label className="form-label">From Date <span className="required">*</span></label>

                        <input
                            type="date"
                            className="form-input"
                            name="fromDate"
                            value={leave.fromDate}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label className="form-label">To Date <span className="required">*</span></label>

                        <input
                            type="date"
                            className="form-input"
                            name="toDate"
                            value={leave.toDate}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label className="form-label">Reason <span className="required">*</span></label>

                    <textarea
                        className="form-input form-textarea"
                        rows="6"
                        placeholder="Explain the reason for your leave request..."
                        name="reason"
                        value={leave.reason}
                        onChange={handleChange}
                    />

                </div>

                <button type="submit" className="form-submit">
                    Submit Leave Request
                </button>

            </form>

        </div>

    );

}

export default ApplyLeave;