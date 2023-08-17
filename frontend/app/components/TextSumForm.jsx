"use client";

import { useRef, useState } from "react";

const TextSumForm = () => {
  const handleSummarize = async () => {
    const [summaryText, setSummaryText] = useState("");
    const data = useRef(null);

    // const response = await fetch(
    //   "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    //   {
    //     headers: { Authorization: `Bearer ${API_TOKEN}` },
    //     method: "POST",
    //     body: JSON.stringify(data.current.value),
    //   }
    // );
    // const result = await response.json();
    // console.log(result);
  };
  return (
    <div className="textSumForm" style={{ display: "flex" }}>
      <textarea type="text" style={{ width: "90vw" }} ref={data} />
      {/* SELECT Parameters */}
      <button style={{ width: "10vw" }} onClick={handleSummarize}>
        Summarize
      </button>
    </div>
  );
};

export default TextSumForm;
