import { useState, useEffect } from "react";
import { fetchPeopleAndAssignments, saveAssignment } from "../firebase/queries";

export function DrawPage() {
  const [people, setPeople] = useState<string[]>([]);
  const [takenPeople, setTakenPeople] = useState<string[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<string>("");
  const [assignedPerson, setAssignedPerson] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [peopleWhoDrew, setPeopleWhoDrew] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { peopleList, takenList, drawnList } =
          await fetchPeopleAndAssignments();
        setPeople(peopleList);
        setTakenPeople(takenList);
        setPeopleWhoDrew(drawnList);
        console.log("After fetch:", { people, takenPeople, peopleWhoDrew });
      } catch (error) {
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
      const availablePeople = people.filter(
        (p) => !takenPeople.includes(p) && p !== selectedPerson
      );

      if (availablePeople.length === 0) {
        setError("Ingen flere personer tilgjengelig");
        return;
      }

      const randomPerson =
        availablePeople[Math.floor(Math.random() * availablePeople.length)];
      await saveAssignment(selectedPerson, randomPerson);
      setAssignedPerson(randomPerson);
      setTakenPeople([...takenPeople, randomPerson]);
      setPeopleWhoDrew([...peopleWhoDrew, selectedPerson]);
    } catch (error) {
      console.error("Error saving assignment:", error);
      setError("Noe gikk galt ved trekning");
    }
  };

  return (
    <div className="container">
      <h1>Trekk din hemmelige venn 🎅</h1>
      <div className="draw-container">
        <select
          value={selectedPerson}
          onChange={(e) => {
            setSelectedPerson(e.target.value);
            setAssignedPerson(null);
          }}
          className="person-select"
        >
          <option value="">Velg person</option>
          {people
            .filter((person) => !peopleWhoDrew.includes(person))
            .map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
        </select>

        <button
          onClick={handleDraw}
          disabled={!selectedPerson || !!assignedPerson}
          className="draw-button"
        >
          Trekk person
        </button>

        {error && <p className="error">{error}</p>}

        {assignedPerson && (
          <div className="result">
            <p>Du er hemmelig nisse for:</p>
            <p className="assigned-person">{assignedPerson}</p>
          </div>
        )}

        <div className="status">
          <p style={{ color: "white" }}>
            Antall personer igjen: {people.length - takenPeople.length}
          </p>
        </div>
      </div>
    </div>
  );
}
