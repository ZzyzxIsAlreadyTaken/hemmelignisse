import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { fetchAssignment } from "../firebase/queries";
export function AssignmentsList({ people }) {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [assignedPerson, setAssignedPerson] = useState(null);
    const handlePersonClick = async (person) => {
        try {
            const assigned = await fetchAssignment(person);
            setSelectedPerson(person);
            setAssignedPerson(assigned);
        }
        catch (error) {
            console.error("Error fetching assignment:", error);
            setAssignedPerson(null);
        }
    };
    return (_jsxs("div", { className: "assignments-container", children: [_jsx("h2", { children: "Oversikt over nisser" }), _jsx("div", { className: "people-grid", children: people.map((person) => (_jsx("button", { onClick: () => handlePersonClick(person), className: `person-button ${selectedPerson === person ? "selected" : ""}`, children: person }, person))) }), selectedPerson && assignedPerson && (_jsxs("div", { className: "assignment-result", children: [_jsxs("p", { children: [selectedPerson, " er hemmelig nisse for:"] }), _jsx("p", { className: "assigned-person", children: assignedPerson })] }))] }));
}
