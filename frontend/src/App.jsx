import "./App.css";
import { Route, Routes, NavLink } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import { useDispatch } from "react-redux";
import { logout } from "./store/apiCalls/auth";

function App() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <nav>
        <NavLink to={"/"} className="link">
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
        </NavLink>
        <button onClick={handleLogout}>logout</button>
      </nav>
      <Routes>
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/dashboard/:id"} element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
