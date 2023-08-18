import { useRef } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/apiCalls/auth";
import { getJwtTokenFromCookie, token } from "../../store/apiCalls/apiService";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(login({ email, password }));
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" ref={emailRef} />
        <input type="password" ref={passwordRef} />
        <button type="submit">Login</button>
      </form>
      {isLoading && <div>Loading...</div>}
      {error ? (
        <div>ERROR! {error}</div>
      ) : (
        <div>
          info {user?.userId} {user?.email} {user?.password}
          {user?.name}
        </div>
      )}
      {/* {getJwtTokenFromCookie() || "no token"} */}
    </div>
  );
};

export default Login;
