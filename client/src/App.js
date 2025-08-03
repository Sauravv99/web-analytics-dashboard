import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import Authpage from "./components/authpage/authpage";
import TeamComponent from "./pages/teams/teams";
import SideBar from "./components/sidebar/sidebar";
import { useEffect } from "react";
import "./App.css"
import Header from "./components/header/header";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
     <div className="d-flex min-vh-100 maincomponents">
      {   isAuthenticated && <SideBar /> }
      <div className="flex-grow-1 main-right-side" style={{ marginLeft: "0px" }}>
          { isAuthenticated && <Header/>}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Authpage />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/teams"
            element={
              isAuthenticated ? <TeamComponent /> : <Navigate to="/" replace />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
