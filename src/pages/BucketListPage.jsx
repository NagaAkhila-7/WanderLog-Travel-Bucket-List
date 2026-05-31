import { useContext } from "react";
import { BucketListContext } from "../context/BucketListContext";
import Navbar from "../components/Navbar";

function BucketListPage() {
  const { wishlist, visited } = useContext(BucketListContext);

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
          marginBottom: "30px",
        }}
      >
        My Travel Bucket List
      </h1>

      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        ❤️ Wishlist Countries ({wishlist.length})
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {wishlist.map((country, index) => (
          <div key={index} className="country-card">
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
              <h3>{country.name.common}</h3>

              <p>
                <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
              </p>

              <p>
                <strong>Region:</strong> {country.continents?.[0]}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        ✅ Visited Countries ({visited.length})
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {visited.map((country, index) => (
          <div key={index} className="country-card">
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
              <h3>{country.name.common}</h3>

              <p>
                <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
              </p>

              <p>
                <strong>Region:</strong> {country.continents?.[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BucketListPage;
