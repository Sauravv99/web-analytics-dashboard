import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { toggleTheme } from "../../redux/slices/themeslice";
function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const handletheme=()=>{
    dispatch(toggleTheme())
  }

  return (
    <div className="d-flex  ms-5 ms-md-4 mt-3 justify-content-between align-items-center">
      <h2>DASHBOARD</h2>
      <div className="d-flex">
        <h5 className="d-none d-md-block me-3 fst-italic">
          {user.username} <i className="bi ms-2 bi-person-circle me-2"></i>
        </h5>
        <h5 onClick={handletheme} className="cursor-pointer me-3">
          <i className="bi bi-moon"></i>
        </h5>
        <h5 onClick={handleLogout} className="cursor-pointer">
          {" "}
          <i className="bi bi-power me-2"></i>
        </h5>
      </div>
    </div>
  );
}

export default Header;
