import { useRef } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/apiCalls/auth";
import { getJwtTokenFromCookie, token } from "../../store/apiCalls/apiService";
import { NavLink } from "react-router-dom";

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
      <div className="form-container">
        <div className="login-header">
          <div className="login-title">SUMMIFY</div>
          <div className=" no-account">
            you don't have an account!
            <span>
              <NavLink to={"/register"} className="link">
                register
              </NavLink>
            </span>
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              ref={emailRef}
              placeholder="ex: john.doe@gmail.com"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              ref={passwordRef}
              placeholder="ex: @password123"
            />
            <div className="forget-pass">Forgot your password?</div>
          </div>
          <button type="submit" className="form-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
