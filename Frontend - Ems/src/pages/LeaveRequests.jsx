import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllLeaveRequests,
    approveLeaveRequest,
    rejectLeaveRequest
} from "../store/slices/leaveSlice";

function LeaveRequests() {

    const dispatch = useDispatch();
    const { allLeaveRequests: leaves, loading } = useSelector(state => state.leave);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    useEffect(() => {
        dispatch(fetchAllLeaveRequests());
    }, [dispatch]);

    function approve(id) {

        dispatch(approveLeaveRequest(id))

            .then(() => {

                toast.success("Leave approved successfully.");
                dispatch(fetchAllLeaveRequests());

            })

            .catch((error) => {

                console.log(error);

                toast.error("Unable to approve leave request.");

            });

    }

    function reject(id) {

        dispatch(rejectLeaveRequest(id))

            .then(() => {

                toast.success("Leave rejected successfully.");
                dispatch(fetchAllLeaveRequests());

            })

            .catch((error) => {

                console.log(error);

                toast.error("Unable to reject leave request.");

            });

    }

    function badge(status) {

        switch (status) {

            case "APPROVED":
                return <span className="badge bg-success">Approved</span>;

            case "REJECTED":
                return <span className="badge bg-danger">Rejected</span>;

            case "CANCELLED":
                return <span className="badge bg-secondary">Cancelled</span>;

            default:
                return <span className="badge bg-warning text-dark">Pending</span>;

        }

    }

    const filteredLeaves = leaves.filter((leave) => {

        const matchesSearch =

            (leave.employeeName || "")
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =

            statusFilter === "ALL" ||

            leave.status === statusFilter;

        return matchesSearch && matchesStatus;

    });

    return (

        <div className="employee-container">

            <div className="employee-header mb-4">

                <h2 className="title">

                    Leave Requests

                </h2>

                <p className="section-copy">

                    Approve or reject employee leave requests.

                </p>

            </div>

            <div className="leave-toolbar mb-4">
                <div className="leave-search-wrap" style={{ flex: "1 1 260px" }}>
                    <input
                        className="search-input"
                        placeholder="Search employee..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="leave-filter-wrap" style={{ flex: "0 0 220px" }}>
                    <select
                        className="form-control"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="table-responsive">

                <table className="table employee-table leave-table">

                    <thead>

                        <tr>

                            <th>Employee</th>
                            <th>Leave</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredLeaves.length > 0 ?

                            filteredLeaves.map((leave) => (

                                <tr key={leave.id}>

                                    <td>

                                        {leave.employeeName}

                                    </td>

                                    <td>

                                        {leave.leaveType}

                                    </td>

                                    <td>

                                        {leave.fromDate}

                                    </td>

                                    <td>

                                        {leave.toDate}

                                    </td>

                                    <td>

                                        {leave.reason}

                                    </td>

                                    <td>

                                        {badge(leave.status)}

                                    </td>

                                    <td>

                                        {

                                            leave.status === "PENDING" && (

                                                <>

                                                    <button

                                                        className="btn btn-success btn-sm me-2"

                                                        onClick={() =>
                                                            approve(leave.id)
                                                        }

                                                    >

                                                        Approve

                                                    </button>

                                                    <button

                                                        className="btn btn-danger btn-sm"

                                                        onClick={() =>
                                                            reject(leave.id)
                                                        }

                                                    >

                                                        Reject

                                                    </button>

                                                </>

                                            )

                                        }

                                    </td>

                                </tr>

                            ))

                            :

                            (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center"
                                    >

                                        No Leave Requests

                                    </td>

                                </tr>

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default LeaveRequests;