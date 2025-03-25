import React from "react";
import { useLocation } from "react-router-dom";

const PrescriptionPage = () => {
    const location = useLocation();
    const { appointment } = location.state || {};

    return (
        <div className="container">
            <h2>Doctor's Prescription</h2>
            {appointment ? (
                <>
                    <p><strong>Date:</strong> {new Date(appointment.date).toDateString()}</p>
                    <p><strong>Slot:</strong> {appointment.slot}</p>
                    <p><strong>Problem:</strong> {appointment.problem}</p>
                    <h3>Prescription:</h3>
                    <p>{appointment.prescription || "Prescription will be available after consultation."}</p>
                </>
            ) : (
                <p>No appointment details found.</p>
            )}
        </div>
    );
};

export default PrescriptionPage;
