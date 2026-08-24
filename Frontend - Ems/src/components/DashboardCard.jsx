import React from "react";
import "./DashboardCard.css";

function DashboardCard({
    title,
    value,
    icon,
    bgColor = "#3b82f6",
    textColor = "#ffffff",
    statusType = "default"
}) {

    return (

        <div
            className={`dashboard-card dashboard-card-${statusType}`}
            style={{
                "--card-color": bgColor
            }}
        >

            <div className="card-content">

                <div className="card-info">

                    <h6 className="card-title">
                        {title}
                    </h6>

                    <h2 className="card-value">
                        {value}
                    </h2>

                </div>

                <div className="card-icon">
                    {icon}
                </div>

            </div>

            <div className="card-background-blur"></div>

        </div>

    );

}

export default DashboardCard;