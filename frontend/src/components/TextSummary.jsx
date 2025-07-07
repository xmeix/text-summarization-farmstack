import "./TextSummary.css";
const TextSummary = ({ text, summary }) => {
  return (
    <div className="text-summary">
      <div className="text">
        <span className="words-length">{`[ ${
          text.split(/\s+/).length
        } word ]`}</span>

        <p>{text}</p>
      </div>
      <div className="summary">
        <span className="words-length">{`[ ${
          summary.split(/\s+/).length
        } word ]`}</span>{" "}
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default TextSummary;
