"use client";
const TextSumForm = () => {
  const handleSummarize = () => {
    console.log("Summarizing...");
    // Add your summarization logic here
  };
  return (
    <div className="textSumForm" style={{ display: "flex" }}>
      <textarea type="text" style={{ width: "90vw" }} />
      {/* SELECT Parameters */}
      <button style={{ width: "10vw" }} onClick={handleSummarize}>
        Summarize
      </button>
    </div>
  );
};

export default TextSumForm;
