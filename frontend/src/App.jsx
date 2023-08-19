import "./App.css";
import { Route, Routes, NavLink } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/navbar/Navbar";

function App() {
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

  return (
    <div>
      {isLoggedIn && <Navbar />}
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
