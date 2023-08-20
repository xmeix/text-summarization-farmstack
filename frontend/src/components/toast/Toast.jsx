import "./Toast.css";
const Toast = ({ error, success }) => {
  return (
    <>
      {error && <div className="toast-error">{error || "Error!"}</div>}
      {success && <div className="toast">{success || "summarizing!"}</div>}
    </>
  );
};

export default Toast;
