import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export const fetchPeopleAndAssignments = async () => {
  const peopleSnapshot = await getDocs(collection(db, "people"));
  const peopleList = peopleSnapshot.docs.map((doc) => doc.data().name);

  const assignmentsSnapshot = await getDocs(collection(db, "assignments"));
  const assignments = assignmentsSnapshot.docs.map((doc) => doc.data());

  const takenList = assignments.map((doc) => doc.assignedTo);
  const drawnList = assignments.map((doc) => doc.santa); // People who have drawn someone

  return { peopleList, takenList, drawnList };
};

export const saveAssignment = async (santa: string, assignedTo: string) => {
  await setDoc(doc(db, "assignments", santa), {
    santa,
    assignedTo,
    timestamp: new Date(),
  });
};

export async function fetchAssignment(person: string) {
  const assignmentsRef = collection(db, "assignments");
  const q = query(assignmentsRef, where("assignedTo", "==", person));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data().santa;
}

export const fetchPeopleFromDB = async () => {
  const peopleSnapshot = await getDocs(collection(db, "people"));
  return peopleSnapshot.docs.map((doc) => doc.data().name);
};
