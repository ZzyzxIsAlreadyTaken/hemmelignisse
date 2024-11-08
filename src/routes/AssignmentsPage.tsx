import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./AssignmentsPage.css";

interface Assignment {
  santa: string;
  assignedTo: string;
  timestamp: Date;
}

export function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [people, setPeople] = useState<string[]>([]);
  const [selectedSanta, setSelectedSanta] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch assignments
        const assignmentsRef = collection(db, "assignments");
        const assignmentsSnapshot = await getDocs(assignmentsRef);
        const assignmentList = assignmentsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate(),
        })) as Assignment[];

        // Fetch people
        const peopleRef = collection(db, "people");
        const peopleSnapshot = await getDocs(peopleRef);
        const peopleList = peopleSnapshot.docs.map((doc) => doc.data().name);

        setAssignments(assignmentList);
        setPeople(peopleList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const allAssignees = [...new Set(assignments.map((a) => a.assignedTo))];

  return (
    <div className="container">
      <h1>Oversikt over trekning 🎅</h1>

      <h2>Alle deltakere</h2>
      <div className="participants-grid">
        {people.map((person) => (
          <button
            key={person}
            className={`btn assignment-item ${
              selectedSanta === person ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedSanta(person);
              setIsModalOpen(true);
            }}
          >
            {person}
          </button>
        ))}
      </div>

      {selectedSanta && isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h3>Trekning resultat</h3>
            <p>
              {selectedSanta}
              {(() => {
                const assignment = assignments.find(
                  (a) => a.santa === selectedSanta
                );
                return assignment
                  ? ` → ${assignment.assignedTo}`
                  : " har ikke trukket ennå";
              })()}
            </p>
          </div>
        </div>
      )}

      <h2>Er trukket:</h2>
      <div className="drawn-cloud">
        {allAssignees.map((assignee) => (
          <div key={assignee} className="assignment-item">
            {assignee}
          </div>
        ))}
      </div>
    </div>
  );
}
