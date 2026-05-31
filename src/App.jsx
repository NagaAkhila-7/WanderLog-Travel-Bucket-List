import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ExplorePage from "./pages/ExplorePage";
import CountryDetailPage from "./pages/CountryDetailPage";
import BucketListPage from "./pages/BucketListPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <ExplorePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/country/:code"
          element={
            <PrivateRoute>
              <CountryDetailPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/bucketlist"
          element={
            <PrivateRoute>
              <BucketListPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
