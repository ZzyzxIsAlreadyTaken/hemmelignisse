import { Routes, Route } from "react-router-dom";
import { DrawPage } from "./routes/DrawPage";
import { AssignmentsPage } from "./routes/AssignmentsPage";
import { PasswordProtection } from "./components/PasswordProtection";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("isAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <PasswordProtection onCorrectPassword={() => setIsAuthenticated(true)} />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<DrawPage />} />
      <Route path="/oversikt" element={<AssignmentsPage />} />
    </Routes>
  );
}

export default App;
