import { useEffect, useState, useContext } from "react";
import { getCountries } from "../api/countriesApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BucketListContext } from "../context/BucketListContext";

function ExplorePage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  const navigate = useNavigate();

  const { addToWishlist, addToVisited } = useContext(BucketListContext);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        console.log(error);
        setError("Failed to load countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRegion =
      region === "All"
        ? true
        : region === "Americas"
          ? country.continents?.[0]?.includes("America")
          : country.continents?.[0] === region;

    return matchesSearch && matchesRegion;
  });

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div
      style={{
        padding: "20px",
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <h1
        style={{
          textAlign: "center",
          margin: "25px 0",
          fontSize: "28px",
          fontFamily: "Segoe UI",
        }}
      >
        Explore Countries
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "350px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      <h3
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Total Countries: {filteredCountries.length}
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "25px",
        }}
      >
        {["All", "Africa", "Americas", "Asia", "Europe", "Oceania"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setRegion(item)}
              style={{
                background: region === item ? "#ff6b57" : "#0f766e",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredCountries.map((country) => (
          <div
            key={country.cca3}
            className="country-card"
            onClick={() => navigate(`/country/${country.cca3}`)}
          >
            <img
              src={country.flags.png}
              alt={country.name.common}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h3
                style={{
                  marginBottom: "10px",
                }}
              >
                {country.name.common}
              </h3>

              <p>
                <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
              </p>

              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>

              <p>
                <strong>Region:</strong> {country.continents?.[0]}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(country);
                  }}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "#fff",
                    border: "2px solid #ffb4a8",
                    color: "#ff6b57",
                    fontSize: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  ♡
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToVisited(country);
                  }}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "#fff",
                    border: "2px solid #8fd3d0",
                    color: "#0f766e",
                    fontSize: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  ✓
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;
