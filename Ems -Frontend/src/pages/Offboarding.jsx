import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllOffboarding,
    createNewOffboarding,
    removeOffboarding,
    finishOffboarding
} from "../store/slices/offboardingSlice";
import { fetchEmployees } from "../store/slices/employeeSlice";
import "../styles/Offboarding.css";

function Offboarding() {

    const dispatch = useDispatch();

    const { offboardingList, loading } = useSelector(state => state.offboarding);
    const { employees } = useSelector(state => state.employee);

    const [formData, setFormData] = useState({

        employeeId: "",

        employeeName: "",

        employeeEmail: "",

        department: "",

        lastWorkingDay: "",

        reason: "",

        exitInterview: ""

    });

    useEffect(() => {

        dispatch(fetchEmployees(0));

        dispatch(fetchAllOffboarding());

    }, [dispatch]);

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await dispatch(createNewOffboarding(formData));

            alert("Offboarding Created Successfully");

            setFormData({

                employeeId: "",

                employeeName: "",

                employeeEmail: "",

                department: "",

                lastWorkingDay: "",

                reason: "",

                exitInterview: ""

            });

            dispatch(fetchAllOffboarding());

        } catch (error) {

            console.log(error);

            alert("Unable to create offboarding.");

        }

    }

    async function handleDelete(id) {

        if (!window.confirm("Delete this record?")) {

            return;

        }

        await dispatch(removeOffboarding(id));

        dispatch(fetchAllOffboarding());

    }

    async function handleComplete(id) {

        await dispatch(finishOffboarding(id));

        dispatch(fetchAllOffboarding());

    }

    function handleEmployeeSelect(event) {

        const employee = employees.find(

            emp => emp.id === Number(event.target.value)

        );

        if (!employee) return;

        setFormData({

            ...formData,

            employeeId: employee.id,

            employeeName: employee.name,

            employeeEmail: employee.email,

            department: employee.department

        });

    }

    return (

        <div className="container-fluid offboarding-page">

            <h2 className="page-title">

                Employee Offboarding

            </h2>

            {/* Summary */}

            <div className="row mb-4">

                <div className="col-md-3">

                    <div className="summary-card bg-primary">

                        <h6>Total</h6>

                        <h3>{offboardingList.length}</h3>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="summary-card bg-warning">

                        <h6>Pending</h6>

                        <h3>

                            {

                                offboardingList.filter(

                                    x => x.status === "PENDING"

                                ).length

                            }

                        </h3>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="summary-card bg-success">

                        <h6>Completed</h6>

                        <h3>

                            {

                                offboardingList.filter(

                                    x => x.status === "COMPLETED"

                                ).length

                            }

                        </h3>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="summary-card bg-info">

                        <h6>In Progress</h6>

                        <h3>

                            {

                                offboardingList.filter(

                                    x => x.status === "IN_PROGRESS"

                                ).length

                            }

                        </h3>

                    </div>

                </div>

            </div>

            {/* Form */}

            <div className="card mb-4">

                <div className="card-body">

                    <h4>

                        Start Offboarding

                    </h4>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-4 mb-3">

                                <select

                                    className="form-control"

                                    value={formData.employeeId}

                                    onChange={handleEmployeeSelect}

                                >

                                    <option value="">

                                        Select Employee

                                    </option>

                                    {

                                        (Array.isArray(employees) ? employees : []).map(employee => (

                                            <option

                                                key={employee.id}

                                                value={employee.id}

                                            >

                                                {employee.name}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            <div className="col-md-4 mb-3">

                                <input

                                    className="form-control"

                                    placeholder="Employee Name"

                                    value={formData.employeeName}

                                    readOnly

                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <input

                                    className="form-control"

                                    placeholder="Email"

                                    value={formData.employeeEmail}

                                    readOnly

                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <input

                                    className="form-control"

                                    placeholder="Department"

                                    value={formData.department}

                                    readOnly

                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <input

                                    type="date"

                                    className="form-control"

                                    name="lastWorkingDay"

                                    value={formData.lastWorkingDay}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <input

                                    className="form-control"

                                    placeholder="Reason"

                                    name="reason"

                                    value={formData.reason}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <textarea

                                    className="form-control"

                                    rows="3"

                                    placeholder="Exit Interview"

                                    name="exitInterview"

                                    value={formData.exitInterview}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <button

                            className="btn btn-primary"

                        >

                            Start Offboarding

                        </button>

                    </form>

                </div>

            </div>

            {/* Table */}

            <div className="card">

                <div className="card-body">

                    <h4>

                        Offboarding List

                    </h4>

                    <table className="table table-hover">

                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Department</th>

                                <th>Last Working Day</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                offboardingList.map(item => (

                                    <tr key={item.id}>

                                        <td>{item.employeeName}</td>

                                        <td>{item.department}</td>

                                        <td>{item.lastWorkingDay}</td>

                                        <td>{item.status}</td>

                                        <td>

                                            <button

                                                className="btn btn-success btn-sm me-2"

                                                onClick={() => handleComplete(item.id)}

                                            >

                                                Complete

                                            </button>

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() => handleDelete(item.id)}

                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Offboarding;