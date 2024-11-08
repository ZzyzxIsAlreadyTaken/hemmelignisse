import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { fetchPeopleFromDB } from "../firebase/queries";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
export function AssignmentsPage() {
    const [people, setPeople] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [assignedPerson, setAssignedPerson] = useState(null);
    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const peopleList = await fetchPeopleFromDB();
                setPeople(peopleList);
            }
            catch (error) {
                console.error("Error fetching people:", error);
            }
        };
        fetchPeople();
    }, []);
    const handlePersonClick = async (person) => {
        try {
            const q = query(collection(db, "assignments"), where("santa", "==", person));
            const snapshot = await getDocs(q);
            if (selectedPerson === person) {
                setSelectedPerson(null);
                setAssignedPerson(null);
            }
            else {
                setSelectedPerson(person);
                setAssignedPerson(snapshot.empty ? null : snapshot.docs[0].data().assignedTo);
            }
        }
        catch (error) {
            console.error("Error fetching assignment:", error);
            setAssignedPerson(null);
        }
    };
    return (_jsxs("div", { className: "container", children: [_jsx("h1", { children: "Oversikt over nisser \uD83C\uDF85" }), _jsxs("div", { className: "assignments-container", children: [_jsx("div", { className: "people-grid", children: people.map((person) => (_jsx("button", { onClick: () => handlePersonClick(person), className: `person-button ${selectedPerson === person ? "selected" : ""}`, children: person }, person))) }), selectedPerson && assignedPerson && (_jsx("div", { className: "assignment-result", children: _jsxs("p", { children: [selectedPerson, " er hemmelig nisse for ", assignedPerson] }) }))] })] }));
}
