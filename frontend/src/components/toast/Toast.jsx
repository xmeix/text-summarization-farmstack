import "./Toast.css";
const Toast = ({ error }) => {
  return <div className="toast-error">{error || "Error!"}</div>;
};

export default Toast;
