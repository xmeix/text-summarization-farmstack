import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/apiCalls/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, error, user } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  // ----------------------------------------------------------------------------
  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    navigate("/login");
  };
  // ----------------------------------------------------------------------------

  return (
    <nav className="navbar">
      <div className="nav-p1">
        <div className="nav-logo">Sum.</div>
        <NavLink to={"/dashboard"} className="link">
          dashboard
        </NavLink>
      </div>
      <div className="nav-p2">
        <div className="user-name">@{user?.name}</div>

        <button onClick={handleLogout} className="logout-btn">
          logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
