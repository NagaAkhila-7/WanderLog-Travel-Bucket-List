import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        background: "#0f766e",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h2
        style={{
          color: "white",
          margin: 0,
        }}
      >
        WanderLog
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link
          to="/explore"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Explore
        </Link>

        <Link
          to="/bucketlist"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Bucket List
        </Link>

        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "white",
            color: "#0f766e",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          M
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            background: "white",
            color: "#0f766e",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
