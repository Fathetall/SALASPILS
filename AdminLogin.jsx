import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/create-post");
    }

    setLoading(false);
  }

  return (
    <div className="auth-container">
      <h2>Administrātora pieslēgšanās</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <label>
          E-pasts
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            placeholder="ievadi e-pastu"
          />
        </label>
        <label>
          Parole
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="ievadi paroli"
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Pieslēdzos..." : "Pieslēgties"}
        </button>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </form>

      <style>{`
        .auth-container {
          max-width: 420px;
          margin: 60px auto;
          padding: 30px 40px;
          background: #f0f6f8;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        h2 {
          margin-bottom: 25px;
          color: #004d61;
          text-align: center;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        label {
          font-weight: 600;
          color: #0a3749;
          display: flex;
          flex-direction: column;
          font-size: 14px;
          letter-spacing: 0.03em;
        }
        input {
          margin-top: 6px;
          padding: 12px 14px;
          font-size: 15px;
          border: 2px solid #8ab6d6;
          border-radius: 8px;
          transition: border-color 0.3s ease;
        }
        input:focus {
          border-color: #005f73;
          outline: none;
          box-shadow: 0 0 6px #005f73aa;
        }
        button {
          padding: 14px 0;
          font-weight: 700;
          font-size: 16px;
          color: white;
          background: #007ea7;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        button:disabled {
          background: #a0bfcf;
          cursor: not-allowed;
        }
        button:hover:not(:disabled) {
          background: #005f73;
        }
        .error-msg {
          margin-top: 10px;
          color: #d90429;
          font-weight: 600;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
