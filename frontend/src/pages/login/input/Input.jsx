import "./Input.css";
const Input = ({ label, name, type, placeholder, inputRef }) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        ref={inputRef}
        placeholder={placeholder}
        required
      />
      {name === "password" && (
        <div className="forget-pass">Forgot your password?</div>
      )}
    </div>
  );
};

export default Input;
