import { useState } from "react";

interface PasswordProtectionProps {
  onCorrectPassword: () => void;
}

export function PasswordProtection({
  onCorrectPassword,
}: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "EUCNisse2024") {
      onCorrectPassword();
      // Store in sessionStorage so the user doesn't need to enter it again
      sessionStorage.setItem("isAuthenticated", "true");
    } else {
      setError(true);
    }
  };

  return (
    <div className="password-container">
      <form onSubmit={handleSubmit} className="password-form">
        <h1>EUC Hemmelig Nisse 🎅</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Skriv inn passord"
          className="password-input"
        />
        {error && <p className="error-message">Feil passord</p>}
        <button type="submit" className="password-button">
          Gå videre
        </button>
      </form>
    </div>
  );
}
