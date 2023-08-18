import { useRef } from "react";
import { login } from "../../store/authSlice";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error, token } = useSelector((state) => state.auth);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(login({ email, password }));
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input type="text" ref={emailRef} />
      <input type="password" ref={passwordRef} />
      <button onClick={handleLogin}>Login</button>
      {isLoading && <div>Loading...</div>}
      {error && <div>ERROR!</div>}
      {!error && <div>{token}</div>}
    </div>
  );
};

export default Login;
