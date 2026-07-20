import axios from "axios";
import { useEffect, useState } from "react";
import "./EmployeeListModern.css";

function EmployeeList({
    setSelectedEmployee,
    refresh,
    role
}) {

    // EMPLOYEE STATE
    const [employees, setEmployees]
    = useState([]);

    // SEARCH STATE
    const [search, setSearch]
    = useState("");

    // FILE STATE
    const [file, setFile]
    = useState(null);

    // PAGINATION STATE
    const [currentPage, setCurrentPage]
    = useState(0);

    // DEPARTMENT DROPDOWN
    const [departmentFilter, setDepartmentFilter]
    = useState("");

    // BUTTON DROPDOWN STATE
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // REFRESH EMPLOYEES
    function refreshEmployees() {

        axios
            .get(
                "http://localhost:9090/api/employees/refresh"
            )

            .then((response) => {

                setEmployees(response.data);

            })

            .catch((error) => {

                console.log(error);

            });

    }

    // LOAD EMPLOYEES WITH PAGINATION
    useEffect(() => {

        axios
            .get(

                `http://localhost:9090/api/employees/pagination?page=${currentPage}&size=5`

            )

            .then((response) => {

                setEmployees(
                    response.data.content
                );

            })

            .catch((error) => {

                console.log(error);

            });

    }, [refresh, currentPage]);

    // DELETE EMPLOYEE
    const deleteEmployee = (id) => {
        if (role !== "ADMIN") {
            alert("Only ADMIN users can delete employees.");
            return;
        }

        axios
            .delete(
                `http://localhost:9090/api/employees/${id}`
            )

            .then(() => {

                alert(
                    "Employee Deleted Successfully"
                );

                setEmployees(

                    employees.filter(

                        (employee) =>

                            employee.id !== id

                    )

                );

            })

            .catch((error) => {

                console.log(error);

            });

    };

    // UPLOAD FILE
    function uploadFile() {

        // CHECK FILE
        if (!file) {

            alert(
                "Please select CSV file"
            );

            return;

        }

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        axios.post(

            "http://localhost:9090/api/employees/upload",

            formData

        )

        .then(() => {

            alert(
                "File Uploaded Successfully"
            );

            refreshEmployees();

        })

        .catch((error) => {

            console.log(error);

            alert(
                "File Upload Failed"
            );

        });

    }

    // SORT EMPLOYEES
    function sortEmployees(field) {

        const sorted = [...employees].sort((a, b) => {

            if (
                field === "salary" ||
                field === "id"
            ) {

                return (
                    (a[field] || 0) -
                    (b[field] || 0)
                );

            }

            return (a[field] || "")
                .toString()
                .localeCompare(

                    (b[field] || "")
                        .toString(),

                    undefined,

                    {
                        sensitivity: "base"
                    }

                );

        });

        setEmployees(sorted);

    }

    // SEARCH + DROPDOWN FILTER
    const filteredEmployees = employees.filter(

        (employee) => {

            const matchesSearch =

                employee.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesDepartment =

                departmentFilter === "" ||

                employee.department === departmentFilter;

            return (
                matchesSearch &&
                matchesDepartment
            );

        }

    );

    return (

        <div className="employee-container">

            {/* HEADER */}

            <div

                className=

                "employee-header d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4"

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

                    className=
                    "refresh-btn btn btn-primary"

                    onClick={refreshEmployees}

                >

                    Refresh Employees

                </button>

            </div>

            {/* FILE UPLOAD */}

            {

                role === "ADMIN" && (

                    <div
                        className=
                        "mb-4 d-flex gap-3"
                    >

                        <input

                            type="file"

                            className="form-control"

                            onChange={(e) =>

                                setFile(
                                    e.target.files[0]
                                )

                            }

                        />

                        <button

                            className=
                            "btn btn-success"

                            onClick={uploadFile}

                        >

                            Upload CSV

                        </button>

                    </div>

                )

            }

            {/* SEARCH */}

            <div className="mb-4">

                <input

                    className=

                    "search-input form-control form-control-lg"

                    type="text"

                    placeholder=
                    "Search employees by name"

                    value={search}

                    onChange={(e) =>

                        setSearch(
                            e.target.value
                        )

                    }

                />

            </div>

            {/* DEPARTMENT DROPDOWN (button-style) */}

            <div className="mb-4" style={{ position: "relative" }}>

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

            {/* SORT BUTTONS */}

            <div className="d-flex gap-3 mb-4 flex-wrap">

                <button

                    className="btn btn-dark"

                    onClick={() =>
                        sortEmployees("name")
                    }

                >

                    Sort By Name

                </button>

                <button

                    className="btn btn-dark"

                    onClick={() =>
                        sortEmployees("salary")
                    }

                >

                    Sort By Salary

                </button>

                <button

                    className="btn btn-dark"

                    onClick={() =>
                        sortEmployees("department")
                    }

                >

                    Sort By Department

                </button>

            </div>

            {/* TABLE */}

            <div

                className=

                "table-responsive shadow-sm rounded"

            >

                <table

                    className=

                    "table table-striped table-hover employee-table mb-0"

                >

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Department</th>

                            <th>Salary</th>

                            {

                                (role === "ADMIN" ||
                                 role === "HR") && (

                                    <th>Actions</th>

                                )

                            }

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredEmployees.length > 0 ? (

                                filteredEmployees.map(

                                    (employee) => (

                                        <tr
                                            key={employee.id}
                                        >

                                            {/* ID */}

                                            <td>

                                                {employee.id}

                                            </td>

                                            {/* NAME */}

                                            <td>

                                                <div

                                                    className=

                                                    "d-flex align-items-center gap-3"

                                                >

                                                    {/* AVATAR */}

                                                    <div
                                                        className="avatar"
                                                    >

                                                        {

                                                            employee.name

                                                                ? employee.name

                                                                    .split(" ")

                                                                    .map(

                                                                        (n) =>

                                                                            n[0]

                                                                    )

                                                                    .slice(0, 2)

                                                                    .join("")

                                                                    .toUpperCase()

                                                                : "-"

                                                        }

                                                    </div>

                                                    {/* NAME */}

                                                    <div

                                                        className=

                                                        "name-cell text-start"

                                                    >

                                                        <div
                                                            className="fw-semibold"
                                                        >

                                                            {employee.name}

                                                        </div>

                                                        <div

                                                            className=

                                                            "name-subtitle small"

                                                        >

                                                            {
                                                                employee.department
                                                            }

                                                        </div>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* EMAIL */}

                                            <td
                                                className="email-cell"
                                            >

                                                {employee.email}

                                            </td>

                                            {/* DEPARTMENT */}

                                            <td>

                                                {
                                                    employee.department
                                                }

                                            </td>

                                            {/* SALARY */}

                                            <td>

                                                ₹ {employee.salary}

                                            </td>

                                            {/* ACTIONS */}

                                            {

                                                (role === "ADMIN" ||
                                                 role === "HR") && (

                                                    <td>

                                                        <div className="d-flex gap-2">

                                                            <button

                                                                className="edit-btn"

                                                                onClick={() =>

                                                                    setSelectedEmployee(
                                                                        employee
                                                                    )

                                                                }

                                                            >

                                                                Edit

                                                            </button>

                                                            {role === "ADMIN" && (
                                                                <button

                                                                    className="delete-btn"

                                                                    onClick={() =>

                                                                        deleteEmployee(
                                                                            employee.id
                                                                        )

                                                                    }

                                                                >

                                                                    Delete

                                                                </button>
                                                            )}

                                                        </div>

                                                    </td>

                                                )

                                            }

                                        </tr>

                                    )

                                )

                            ) : (

                                <tr>

                                    <td

                                        colSpan="6"

                                        className=
                                        "text-center py-5 text-muted"

                                    >

                                        No employees found.

                                    </td>

                                </tr>

                            )

                        }

                    </tbody>

                </table>

            </div>

            {/* PAGINATION */}

            <div
                className=
                "d-flex justify-content-center gap-3 mt-4"
            >

                <button

                    className=
                    "btn btn-secondary"

                    disabled={currentPage === 0}

                    onClick={() =>

                        setCurrentPage(
                            currentPage - 1
                        )

                    }

                >

                    Previous

                </button>

                <button

                    className=
                    "btn btn-secondary"

                    onClick={() =>

                        setCurrentPage(
                            currentPage + 1
                        )

                    }

                >

                    Next

                </button>

            </div>

        </div>

    );

}

export default EmployeeList;