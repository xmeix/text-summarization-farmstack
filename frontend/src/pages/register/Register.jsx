import { useDispatch, useSelector } from "react-redux";
import "./Register.css";
import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../login/input/Input";
import { register } from "../../store/apiCalls/auth";
import Error from "../../components/Error/Error";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setErrorMessage("");
    if (name === "" || email === "" || password === "")
      setErrorMessage("Empty fields!");
    else {
      await dispatch(register({ name, email, password }));
      if (error === null) {
        navigate("/login");
      } else setErrorMessage(error);
    }
  };

  const inputs = [
    {
      label: "Full Name *",
      name: "name",
      type: "text",
      placeholder: "ex: John Doe",
      inputRef: nameRef,
    },
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
              <NavLink to={"/login"} className="link">
                login
              </NavLink>
            </span>
          </div>
        </div>
        <form onSubmit={handleRegister}>
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
            Register
          </button>
        </form>
      </div>
      {errorMessage !== "" && <Error error={errorMessage} />}
    </div>
  );
};

export default Register;
