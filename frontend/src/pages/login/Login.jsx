import { useRef } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/apiCalls/auth";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error, token, user } = useSelector((state) => state.auth);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(login({ email, password }));
    console.log(user);
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input type="text" ref={emailRef} />
      <input type="password" ref={passwordRef} />
      <button onClick={handleLogin}>Login</button>
      {isLoading && <div>Loading...</div>}
      {error ? (
        <div>ERROR! {error}</div>
      ) : (
        <div>
          info {user?.userId} {user?.email} {user?.password}
          {user?.name}
        </div>
      )}
    </div>
  );
};

export default Login;
