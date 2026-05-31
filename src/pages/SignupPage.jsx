import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(
        "https://reqres.in/api/register",
        {
          email,
          password,
        },
        {
          headers: {
            "x-api-key": "free_user_3EUhx7T6PGVX2G6LPFbD5Wwrm63",
          },
        },
      );

      alert("Registration Successful");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "#fff",
          padding: "35px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#0f766e",
          }}
        >
          WanderLog
        </h1>

        <h3
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Create Account
        </h3>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: "14px",
            marginBottom: "20px",
            lineHeight: "1.6",
          }}
        >
          Demo Credentials
          <br />
          Email: <strong>eve.holt@reqres.in</strong>
          <br />
          Password: <strong>cityslicka</strong>
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "12px",
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            padding: "12px",
            background: "#0f766e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
