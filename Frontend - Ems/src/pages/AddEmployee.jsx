import { useEffect, useState } from "react";
import axios from "axios";

function AddEmployee({ selectedEmployee, setSelectedEmployee, setRefresh, role }) {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        department: "",
        salary: ""
    });
    

    useEffect(() => {
        if (selectedEmployee) {
            setEmployee(selectedEmployee);
        } else {
            setEmployee({
                name: "",
                email: "",
                department: "",
                salary: ""
            });
        }
    }, [selectedEmployee]);

    function handleChange(e) {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    }

    function clearForm() {
        setEmployee({
            name: "",
            email: "",
            department: "",
            salary: ""
        });
        if (setSelectedEmployee) {
            setSelectedEmployee(null);
        }
    }

    function saveEmployee(e) {
        e.preventDefault();

        if (
            !employee.name ||
            !employee.email ||
            !employee.department ||
            !employee.salary
        ) {
            alert("Please fill all fields");
            return;
        }

        const request = employee.id
            ? axios.put(`http://localhost:9090/api/employees/${employee.id}`, employee)
            : axios.post("http://localhost:9090/api/employees", employee);

        request
            .then(() => {
                alert(employee.id ? "Employee Updated Successfully" : "Employee Added Successfully");
                clearForm();
                setRefresh(prev => !prev);
            })
            .catch((error) => {

    console.log(error);

    if (error.response) {
        console.log(error.response.data);
        alert(JSON.stringify(error.response.data));
    } else {
        alert(error.message);
    }

});
    }

    return (
        <div className="add-employee-panel">
            <h2 className="section-title">
                {employee.id ? "Update Employee" : "Add Employee"}
            </h2>
            <p className="section-copy mb-4">
                Use this form to add a new teammate or update an existing employee profile.
            </p>

            <form onSubmit={saveEmployee} className="employee-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={employee.name}
                    onChange={handleChange}
                    className="form-control mb-3 form-control-lg"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={employee.email}
                    onChange={handleChange}
                    className="form-control mb-3 form-control-lg"
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={employee.department}
                    onChange={handleChange}
                    className="form-control mb-3 form-control-lg"
                />

                <input
                    type="number"
                    name="salary"
                    placeholder="Salary"
                    value={employee.salary}
                    onChange={handleChange}
                    className="form-control mb-4 form-control-lg"
                />

                <div className="d-flex gap-2 flex-column flex-sm-row">
                    <button type="submit" className="btn btn-primary btn-lg flex-fill btn-add">
                        {employee.id ? "Update Employee" : "Add Employee"}
                    </button>
                    {employee.id && (
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-lg flex-fill"
                            onClick={clearForm}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );

}

export default AddEmployee;