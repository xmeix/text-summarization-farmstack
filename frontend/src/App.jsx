import "./App.css";
import { Route, Routes, NavLink } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/apiCalls/auth";
import { useEffect } from "react";
import { getChats } from "./store/apiCalls/chat";
import { getJwtTokenFromCookie } from "./store/apiCalls/apiService";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, error, user } = useSelector(
    (state) => state.auth
  );

  // ----------------------------------------------------------------------------
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleStorageChange = async (event) => {
    if (event.key === "isLoggedIn") {
      handleRefresh();
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ----------------------------------------------------------------------------

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <nav>
        {/* <NavLink to={"/"} className="link">
          Home
        </NavLink>
        <NavLink to={"/dashboard"} className="link">
          dashboard
        </NavLink>
        <NavLink to={"/login"} className="link">
          login
        </NavLink>
        <NavLink to={"/register"} className="link">
          register
        </NavLink>
        <NavLink to={"/dashboard/8"} className="link">
          chat
        </NavLink> */}
        {isLoggedIn && <button onClick={handleLogout}>logout</button>}
      </nav>
      {!isLoggedIn && (
        <Routes>
          <Route path={"*"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      )}
      {isLoggedIn && (
        <Routes>
          <Route path={"*"} element={<Dashboard />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/dashboard/:id"} element={<Chat />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
