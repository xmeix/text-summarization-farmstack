import "./App.css";
import { Route, Routes, NavLink } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "./components/Loading/Loading";
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Register = lazy(() => import("./pages/register/Register"));
const Login = lazy(() => import("./pages/login/Login"));
const Chat = lazy(() => import("./pages/chat/Chat"));
const Navbar = lazy(() => import("./components/navbar/Navbar"));

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
      {isLoggedIn && (
        <Suspense fallback={<Loading />}>
          <Navbar />
        </Suspense>
      )}

      {!isLoggedIn && (
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={"*"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
          </Routes>
        </Suspense>
      )}

      {isLoggedIn && (
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={"*"} element={<Dashboard />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/dashboard/:id"} element={<Chat />} />
          </Routes>
        </Suspense>
      )}
    </div>
  );
}

export default App;
