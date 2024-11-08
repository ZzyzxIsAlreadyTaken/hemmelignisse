import { Routes, Route } from "react-router-dom";
import { DrawPage } from "./routes/DrawPage";
import { AssignmentsPage } from "./routes/AssignmentsPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DrawPage />} />
      <Route path="/oversikt" element={<AssignmentsPage />} />
    </Routes>
  );
}

export default App;
