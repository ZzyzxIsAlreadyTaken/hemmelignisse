import { useState } from "react";
import { fetchAssignment } from "../firebase/queries";

export function AssignmentsList({ people }: { people: string[] }) {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [assignedPerson, setAssignedPerson] = useState<string | null>(null);

  const handlePersonClick = async (person: string) => {
    try {
      const assigned = await fetchAssignment(person);
      setSelectedPerson(person);
      setAssignedPerson(assigned);
    } catch (error) {
      console.error("Error fetching assignment:", error);
      setAssignedPerson(null);
    }
  };

  return (
    <div className="assignments-container">
      <h2>Oversikt over nisser</h2>
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
          <p>{selectedPerson} er hemmelig nisse for:</p>
          <p className="assigned-person">{assignedPerson}</p>
        </div>
      )}
    </div>
  );
}
