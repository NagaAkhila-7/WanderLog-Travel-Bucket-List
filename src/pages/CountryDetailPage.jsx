import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BucketListContext } from "../context/BucketListContext";
import Navbar from "../components/Navbar";

function CountryDetailPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToWishlist, addToVisited } = useContext(BucketListContext);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/alpha/${code}`,
        );

        setCountry(res.data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />

      <button
        onClick={() => navigate("/explore")}
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          color: "#0f766e",
          padding: "10px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "15px",
          fontWeight: "600",
        }}
      >
        ← Back
      </button>

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            background: "#f8f9fa",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <img
            src={country.flags.png}
            alt={country.name.common}
            style={{
              width: "100%",
              height: "220px",
              objectFit: "contain",
            }}
          />
        </div>

        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {country.name.common}
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
            }}
          >
            <h4>Capital</h4>
            <p>{country.capital?.[0] || "N/A"}</p>
          </div>

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
            }}
          >
            <h4>Population</h4>
            <p>{country.population.toLocaleString()}</p>
          </div>

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
            }}
          >
            <h4>Region</h4>
            <p>{country.continents?.[0]}</p>
          </div>

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
            }}
          >
            <h4>Timezone</h4>
            <p>{country.timezones?.[0]}</p>
          </div>
        </div>

        <button
          onClick={() => {
            addToWishlist(country);
            alert("Added to Bucket List");
          }}
          style={{
            width: "100%",
            marginBottom: "10px",
            background: "#ff6b57",
            color: "white",
            padding: "14px",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Add To Bucket List
        </button>

        <button
          onClick={() => {
            addToVisited(country);
            alert("Marked as Visited");
          }}
          style={{
            width: "100%",
            background: "#0f766e",
            color: "white",
            padding: "14px",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Mark As Visited
        </button>
      </div>
    </div>
  );
}

export default CountryDetailPage;
