import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";

function Dashboard (){
 const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;