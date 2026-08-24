import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, removeEmployee } from "../store/slices/employeeSlice";
import "./EmployeeListModern.css";

function EmployeeList({
    setSelectedEmployee,
    refresh,
    role
}) {

    const dispatch = useDispatch();
    const { employees = [], loading, currentPage, totalPages } = useSelector((state) => state.employee);

    // SEARCH STATE
    const [search, setSearch] = useState("");

    // FILE STATE
    const [file, setFile] = useState(null);

    // DEPARTMENT DROPDOWN
    const [departmentFilter, setDepartmentFilter] = useState("");

    // BUTTON DROPDOWN STATE
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // SORT STATE
    const [sortConfig, setSortConfig] = useState({
        field: null,
        direction: "asc"
    });

    // REFRESH EMPLOYEES
    function refreshEmployees() {
        dispatch(fetchEmployees(currentPage));
    }

    // LOAD THE COMPLETE EMPLOYEE LIST FOR EVERY ROLE
    useEffect(() => {
        dispatch(fetchEmployees(currentPage));
    }, [refresh, currentPage, dispatch]);

    // DELETE EMPLOYEE
    const deleteEmployee = (id) => {
        if (role !== "ADMIN") {
            alert("Only ADMIN users can delete employees.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this employee?")) {
            return;
        }

        dispatch(removeEmployee(id)).then(() => {
            alert("Employee Deleted Successfully");
            dispatch(fetchEmployees(0));
        }).catch((error) => {
            console.log(error);
            alert("Failed to delete employee");
        });
    };

    // UPLOAD FILE
    function uploadFile() {

        if (!file) {
            alert("Please select CSV file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        axios.post(
            "http://localhost:9090/api/employees/upload",
            formData
        )
            .then(() => {
                alert("File Uploaded Successfully");
                refreshEmployees();
            })
            .catch((error) => {
                console.log(error);
                alert("File Upload Failed");
            });
    }

    // SORT EMPLOYEES
    function sortEmployees(field) {
        setSortConfig((prev) => {
            if (prev.field === field) {
                return {
                    field,
                    direction: prev.direction === "asc" ? "desc" : "asc"
                };
            }

            return {
                field,
                direction: "asc"
            };
        });
    }

    function goToPage(pageNumber) {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            dispatch(fetchEmployees(pageNumber));
        }
    }

    const sortedEmployees = useMemo(() => {
        const list = [...employees];

        if (!sortConfig.field) {
            return list;
        }

        const directionFactor = sortConfig.direction === "asc" ? 1 : -1;

        return list.sort((a, b) => {
            const valueA = a[sortConfig.field] ?? "";
            const valueB = b[sortConfig.field] ?? "";

            if (sortConfig.field === "salary" || sortConfig.field === "id") {
                return ((Number(valueA) || 0) - (Number(valueB) || 0)) * directionFactor;
            }

            return String(valueA)
                .localeCompare(String(valueB), undefined, { sensitivity: "base" }) * directionFactor;
        });
    }, [employees, sortConfig]);

    // SEARCH + DROPDOWN FILTER
    const filteredEmployees = sortedEmployees.filter((employee) => {
        const matchesSearch = (employee?.name ?? "")
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesDepartment =
            departmentFilter === "" || employee.department === departmentFilter;

        return matchesSearch && matchesDepartment;
    });

    return (

        <div className="employee-container page-fullwidth">

            {/* HEADER */}

            <div
                className="employee-header d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4"
            >

                <div>

                    <h2 className="title mb-1">
                        Employee List
                    </h2>

                    <p className="section-copy mb-0">
                        Track team members,
                        search quickly,
                        and update records
                        from one modern dashboard.
                    </p>

                </div>

                {/* REFRESH BUTTON */}

                <button
                    className="refresh-btn btn btn-primary"
                    onClick={refreshEmployees}
                    type="button"
                >
                    Refresh Employees
                </button>

            </div>

            {/* FILE UPLOAD */}

            {role === "ADMIN" && (
                <div className="mb-4 d-flex gap-3">
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <button
                        className="btn btn-success"
                        onClick={uploadFile}
                        type="button"
                    >
                        Upload CSV
                    </button>
                </div>
            )}

            {/* SEARCH */}

            <div className="employee-toolbar mb-4">
                <div className="employee-search-wrap" style={{ flex: "1 1 260px" }}>
                    <input
                        className="search-input form-control form-control-lg"
                        type="text"
                        placeholder="Search employees by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* DEPARTMENT DROPDOWN (button-style) */}
                <div className="employee-filter-wrap" style={{ position: "relative", flex: "0 0 auto" }}>
                    <div className="dropdown">
                        <button
                            type="button"
                            className="btn btn-outline-secondary dropdown-toggle"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {departmentFilter === "" ? "All Departments" : departmentFilter}
                        </button>

                        {dropdownOpen && (
                            <ul
                                className="dropdown-menu show"
                                style={{ display: "block", position: "absolute", zIndex: 1000 }}
                            >
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => {
                                            setDepartmentFilter("");
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        All Departments
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => {
                                            setDepartmentFilter("IT");
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        IT
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => {
                                            setDepartmentFilter("HR");
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        HR
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => {
                                            setDepartmentFilter("Marketing");
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        Marketing
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => {
                                            setDepartmentFilter("Developers");
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        Developers
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* SORT BUTTONS */}

            <div className="d-flex gap-3 mb-4 flex-wrap">
                <button className="btn btn-dark" type="button" onClick={() => sortEmployees("name")}>
                    Sort By Name
                </button>
                <button className="btn btn-dark" type="button" onClick={() => sortEmployees("email")}>
                    Sort By Email
                </button>
                <button className="btn btn-dark" type="button" onClick={() => sortEmployees("salary")}>
                    Sort By Salary
                </button>
                <button className="btn btn-dark" type="button" onClick={() => sortEmployees("department")}>
                    Sort By Department
                </button>
            </div>

            {/* TABLE */}

            <div className="table-responsive shadow-sm rounded">
                <table className="table table-striped table-hover employee-table mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Salary</th>
                            {(role === "ADMIN" || role === "HR") && (
                                <th className="actions-header">Actions</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>

                                    <td>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar">
                                                {employee.name
                                                    ? employee.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .slice(0, 2)
                                                        .join("")
                                                        .toUpperCase()
                                                    : "-"}
                                            </div>

                                            <div className="name-cell text-start">
                                                <div className="fw-semibold">{employee.name}</div>
                                                <div className="name-subtitle small">{employee.department}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="email-cell">{employee.email}</td>
                                    <td>{employee.department}</td>
                                    <td>₹ {employee.salary}</td>

                                    {(role === "ADMIN" || role === "HR") && (
                                        <td className="actions-cell">
                                            <div className="actions-container">
                                                <button
                                                    className="edit-btn"
                                                    type="button"
                                                    onClick={() => setSelectedEmployee(employee)}
                                                >
                                                    Edit
                                                </button>

                                                {role === "ADMIN" && (
                                                    <button
                                                        className="delete-btn"
                                                        type="button"
                                                        onClick={() => deleteEmployee(employee.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-5 text-muted">
                                    No employees found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        disabled={currentPage === 0}
                        onClick={() => goToPage(currentPage - 1)}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => index).map((page) => (
                        <button
                            key={page}
                            type="button"
                            className={`btn btn-sm ${currentPage === page ? "btn-primary" : "btn-outline-secondary"}`}
                            onClick={() => goToPage(page)}
                        >
                            {page + 1}
                        </button>
                    ))}

                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        disabled={currentPage >= totalPages - 1}
                        onClick={() => goToPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default EmployeeList;
