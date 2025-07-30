import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Authpage from './components/authpage/authpage';


function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Authpage />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;