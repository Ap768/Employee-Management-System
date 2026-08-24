import { useEffect, useState } from "react";
import {
    getMyLeaves,
    cancelLeave,
    getLeaveBalance
} from "../services/leaveService";
import { toast } from "react-toastify";

function MyLeaves() {

    const [leaves, setLeaves] = useState([]);
    const [search, setSearch] = useState("");

    const [balance, setBalance] = useState({
        casualLeave: 0,
        sickLeave: 0,
        earnedLeave: 0
    });

    useEffect(() => {
        loadLeaves();
        loadBalance();
    }, []);

    function loadLeaves() {

        const email = localStorage.getItem("email");

        getMyLeaves(email)
            .then((response) => {
                setLeaves(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function loadBalance() {

        const email = localStorage.getItem("email");

        getLeaveBalance(email)
            .then((response) => {
                setBalance(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function cancel(id) {

        if (!window.confirm("Cancel this leave?")) {
            return;
        }

        cancelLeave(id)
            .then(() => {

                toast.success("Leave cancelled successfully.");

                loadLeaves();
                loadBalance();

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const filteredLeaves = leaves.filter((leave) =>
        leave.leaveType
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    function statusBadge(status) {

        switch (status) {

            case "APPROVED":
                return <span className="status-pill status-pill--approved">Approved</span>;

            case "REJECTED":
                return <span className="status-pill status-pill--rejected">Rejected</span>;

            case "CANCELLED":
                return <span className="status-pill status-pill--cancelled">Cancelled</span>;

            default:
                return <span className="status-pill status-pill--pending">Pending</span>;
        }
    }

    return (

        <div className="employee-container page-fullwidth">

            <div className="employee-header mb-4">
                <p className="eyebrow">Leave dashboard</p>
                <h2 className="section-title">My Leaves</h2>
                <p className="section-copy">
                    Track your leave requests, review balances, and manage pending approvals from one place.
                </p>
            </div>

            <div className="balance-grid mb-5">
                <div className="balance-card balance-card--casual">
                    <p className="balance-label">Casual Leave</p>
                    <h2>{balance.casualLeave}</h2>
                    <p className="balance-copy">Available days</p>
                </div>
                <div className="balance-card balance-card--sick">
                    <p className="balance-label">Sick Leave</p>
                    <h2>{balance.sickLeave}</h2>
                    <p className="balance-copy">Available days</p>
                </div>
                <div className="balance-card balance-card--earned">
                    <p className="balance-label">Earned Leave</p>
                    <h2>{balance.earnedLeave}</h2>
                    <p className="balance-copy">Available days</p>
                </div>
            </div>

            <div className="table-panel">
                <div className="table-header">
                    <div>
                        <h3 className="subtitle">Leave history</h3>
                        <p className="section-copy">Search by leave type and cancel pending requests quickly.</p>
                    </div>
                    <input
                        className="search-input table-search"
                        placeholder="Search leave type..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="leave-table-wrapper">
                    <table className="leave-table">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeaves.length > 0 ? (
                                filteredLeaves.map((leave) => (
                                    <tr key={leave.id}>
                                        <td>{leave.leaveType}</td>
                                        <td>{leave.fromDate}</td>
                                        <td>{leave.toDate}</td>
                                        <td>{statusBadge(leave.status)}</td>
                                        <td>
                                            {leave.status === "PENDING" && (
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => cancel(leave.id)}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="empty-row">
                                    <td colSpan={5}>
                                        No leave records found. Apply for leave to see requests here.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );

}

export default MyLeaves;