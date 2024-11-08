import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const people = ["Ole", "Kari", "Per", "Lisa", "Erik", "Maria"];

async function addPeople() {
  try {
    for (const person of people) {
      await addDoc(collection(db, "people"), {
        name: person,
      });
    }
    console.log("People added successfully!");
  } catch (error) {
    console.error("Error adding people:", error);
  }
}

addPeople();
