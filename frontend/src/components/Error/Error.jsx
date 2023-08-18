import "./Error.css";
const Error = ({ error }) => {
  return <div className="error">{error || "Error!"}</div>;
};

export default Error;
