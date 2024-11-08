import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { fetchPeopleAndAssignments, saveAssignment } from "../firebase/queries";
export function DrawPage() {
    const [people, setPeople] = useState([]);
    const [takenPeople, setTakenPeople] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState("");
    const [assignedPerson, setAssignedPerson] = useState(null);
    const [error, setError] = useState(null);
    const [peopleWhoDrew, setPeopleWhoDrew] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { peopleList, takenList, drawnList } = await fetchPeopleAndAssignments();
                setPeople(peopleList);
                setTakenPeople(takenList);
                setPeopleWhoDrew(drawnList);
                console.log("After fetch:", { people, takenPeople, peopleWhoDrew });
            }
            catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data");
            }
        };
        fetchData();
    }, []);
    const handleDraw = async () => {
        if (!selectedPerson) {
            setError("Vennligst velg en person først");
            return;
        }
        try {
            const availablePeople = people.filter((p) => !takenPeople.includes(p) && p !== selectedPerson);
            if (availablePeople.length === 0) {
                setError("Ingen flere personer tilgjengelig");
                return;
            }
            const randomPerson = availablePeople[Math.floor(Math.random() * availablePeople.length)];
            await saveAssignment(selectedPerson, randomPerson);
            setAssignedPerson(randomPerson);
            setTakenPeople([...takenPeople, randomPerson]);
            setPeopleWhoDrew([...peopleWhoDrew, selectedPerson]);
        }
        catch (error) {
            console.error("Error saving assignment:", error);
            setError("Noe gikk galt ved trekning");
        }
    };
    return (_jsxs("div", { className: "container", children: [_jsx("h1", { children: "Trekk din hemmelige venn \uD83C\uDF85" }), _jsxs("div", { className: "draw-container", children: [_jsxs("select", { value: selectedPerson, onChange: (e) => {
                            setSelectedPerson(e.target.value);
                            setAssignedPerson(null);
                        }, className: "person-select", children: [_jsx("option", { value: "", children: "Velg person" }), people
                                .filter((person) => !peopleWhoDrew.includes(person))
                                .map((person) => (_jsx("option", { value: person, children: person }, person)))] }), _jsx("button", { onClick: handleDraw, disabled: !selectedPerson || !!assignedPerson, className: "draw-button", children: "Trekk person" }), error && _jsx("p", { className: "error", children: error }), assignedPerson && (_jsxs("div", { className: "result", children: [_jsx("p", { children: "Du er hemmelig nisse for:" }), _jsx("p", { className: "assigned-person", children: assignedPerson })] })), _jsx("div", { className: "status", children: _jsxs("p", { style: { color: "white" }, children: ["Antall personer igjen: ", people.length - takenPeople.length] }) })] })] }));
}
