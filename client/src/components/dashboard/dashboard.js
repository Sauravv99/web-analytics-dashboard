import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import SideBar from "../sidebar/sidebar";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="d-flex flex-column flex-lg-row">
      <div
        className="flex-grow-1"
        style={{ padding: "30px", marginLeft: "0px" }}
      >
        <h1>Dashboard</h1>
        <p>Welcome, {user?.email}</p>
        <button onClick={handleLogout} className="btn btn-danger mt-3">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
