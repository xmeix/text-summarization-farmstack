import { useEffect, useRef, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/apiCalls/auth";
import { getJwtTokenFromCookie, token } from "../../store/apiCalls/apiService";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "./input/Input";
import Error from "../../components/Error/Error";
import { getChats } from "../../store/apiCalls/chat";

const Login = () => {
  const dispatch = useDispatch();

  const { isLoading, error, user } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (error !== null) {
      setErrorMessage(error);
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setErrorMessage("");
    if (email.trim() === "" || password.trim() === "")
      setErrorMessage("Empty fields!");
    else {
      await dispatch(login({ email, password }));
      await dispatch(getChats());
      navigate("/dashboard");
    }
  };
  const inputs = [
    {
      label: "Email *",
      name: "Email",
      type: "email",
      placeholder: "ex: john.doe@gmail.com",
      inputRef: emailRef,
    },
    {
      label: "Password *",
      name: "password",
      type: "password",
      placeholder: "ex: @password123",
      inputRef: passwordRef,
    },
  ];

  return (
    <div className="login">
      <div className="form-container">
        <div className="login-header">
          <div className="login-title">SUMMIFY</div>
          <div className=" no-account">
            you don't have an account!{" "}
            <span>
              <NavLink to={"/register"} className="link">
                register
              </NavLink>
            </span>
          </div>
        </div>
        <form onSubmit={handleLogin}>
          {inputs.map((el, i) => (
            <Input
              key={i}
              label={el.label}
              name={el.name}
              type={el.type}
              placeholder={el.placeholder}
              inputRef={el.inputRef}
            />
          ))}
          <button type="submit" className="form-btn" disabled={isLoading}>
            Login
          </button>
        </form>
      </div>
      {errorMessage !== "" && <Error error={errorMessage} />}
    </div>
  );
};

export default Login;
