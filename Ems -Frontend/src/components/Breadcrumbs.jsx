import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css";

const routeLabels = {
    dashboard: "Dashboard",
    employees: "Employees",
    "add-employee": "Add Employee",
    "apply-leave": "Apply Leave",
    "my-leaves": "My Leaves",
    attendance: "Attendance",
    "attendance-management": "Attendance Management",
    "leave-requests": "Leave Requests",
    offboarding: "Offboarding",
    archive: "Archive",
    settings: "Settings",
    holidays: "Holidays",
    "attendance-calendar": "Attendance Calendar",
    "holiday-management": "Holiday Management",
    reports: "Reports",
};

function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname
        .split("/")
        .filter(Boolean);

    if (pathnames.length === 0) {
        return null;
    }

    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol className="breadcrumb-list">
                <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                </li>
                {pathnames.map((segment, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    const label = routeLabels[segment] ||
                        segment
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase());

                    return (
                        <li
                            key={to}
                            className={`breadcrumb-item ${isLast ? "breadcrumb-item--current" : ""}`}
                            aria-current={isLast ? "page" : undefined}
                        >
                            {isLast ? (
                                <span>{label}</span>
                            ) : (
                                <Link to={to}>{label}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;
