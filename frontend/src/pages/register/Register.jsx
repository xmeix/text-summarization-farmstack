import { useDispatch, useSelector } from "react-redux";
import "./Register.css";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../login/input/Input";
import { register } from "../../store/apiCalls/auth";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleRegister = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(register({ name, email, password }));
    if (error === null) {
      navigate("/login");
    }
  };

  return (
    <div className="login">
      <div className="form-container">
        <div className="login-header">
          <div className="login-title">SUMMIFY</div>
          <div className=" no-account">
            you don't have an account!{" "}
            <span>
              <NavLink to={"/login"} className="link">
                login
              </NavLink>
            </span>
          </div>
        </div>
        <form onSubmit={handleRegister}>
          <Input
            label="Full Name"
            name="name"
            type="text"
            placeholder="ex: John Doe"
            inputRef={nameRef}
          />
          <Input
            label="Email"
            name="email"
            type="text"
            placeholder="ex: john.doe@gmail.com"
            inputRef={emailRef}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="ex: @password123"
            inputRef={passwordRef}
          />
          <button type="submit" className="form-btn" disabled={isLoading}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
