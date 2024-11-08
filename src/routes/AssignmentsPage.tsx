import { useState, useEffect } from "react";
import { fetchPeopleFromDB } from "../firebase/queries";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export function AssignmentsPage() {
  const [people, setPeople] = useState<string[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [assignedPerson, setAssignedPerson] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const peopleList = await fetchPeopleFromDB();
        setPeople(peopleList);
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };
    fetchPeople();
  }, []);

  const handlePersonClick = async (person: string) => {
    try {
      const q = query(
        collection(db, "assignments"),
        where("santa", "==", person)
      );
      const snapshot = await getDocs(q);

      if (selectedPerson === person) {
        setSelectedPerson(null);
        setAssignedPerson(null);
      } else {
        setSelectedPerson(person);
        setAssignedPerson(
          snapshot.empty ? null : snapshot.docs[0].data().assignedTo
        );
      }
    } catch (error) {
      console.error("Error fetching assignment:", error);
      setAssignedPerson(null);
    }
  };

  return (
    <div className="container">
      <h1>Oversikt over nisser 🎅</h1>
      <div className="assignments-container">
        <div className="people-grid">
          {people.map((person) => (
            <button
              key={person}
              onClick={() => handlePersonClick(person)}
              className={`person-button ${
                selectedPerson === person ? "selected" : ""
              }`}
            >
              {person}
            </button>
          ))}
        </div>

        {selectedPerson && assignedPerson && (
          <div className="assignment-result">
            <p>
              {selectedPerson} er hemmelig nisse for {assignedPerson}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
