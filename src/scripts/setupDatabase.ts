import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { firebaseConfigForScript } from "../firebase/firebase";
const firebaseConfig = firebaseConfigForScript;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const people = [
  "Mariah",
  "Åsa",
  "Andreas",
  "Erlend",
  "Tine-Marie",
  "Eline",
  "Marius",
  "Rolf-Ove",
  "Jørgen",
  "T-baws",
  "Kjetil",
];

async function setupDatabase() {
  try {
    // Først, slett eksisterende data (valgfritt)
    const peopleSnapshot = await getDocs(collection(db, "people"));
    const assignmentsSnapshot = await getDocs(collection(db, "assignments"));

    // Slett gamle dokumenter
    for (const doc of peopleSnapshot.docs) {
      await deleteDoc(doc.ref);
    }
    for (const doc of assignmentsSnapshot.docs) {
      await deleteDoc(doc.ref);
    }

    // Legg til nye personer
    for (const person of people) {
      await addDoc(collection(db, "people"), {
        name: person,
      });
    }

    console.log("Database setup completed successfully!");
  } catch (error) {
    console.error("Error setting up database:", error);
  }
}

// Kjør setup
setupDatabase();
