import "./TextSummary.css";
const TextSummary = ({ text, summary }) => {
  return (
    <div className="text-summary">
      <div className="text">{text}</div>
      <div className="summary">{summary}</div>
    </div>
  );
};

export default TextSummary;
