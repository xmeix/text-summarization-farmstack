import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SummarizerForm.css";
import { addInChat, getChat, getChats } from "../../store/apiCalls/chat";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
const SummarizerForm = ({ id }) => {
  const textRef = useRef(null);
  const { isLoading, error } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [text, setText] = useState("");
  const [summary_diversity, setSummary_diversity] = useState(false);
  const [min_length, setMin_length] = useState(30);
  const [max_length, setMax_length] = useState(130);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSummarization = async (e) => {
    e.preventDefault();

    if (
      text.trim() === "" ||
      min_length.trim() === "" ||
      max_length.trim() === "" ||
      summary_diversity === ""
    ) {
      setErrorMessage("Please fill in all fields."); // Set error message for empty fields
    } else if (parseInt(min_length) >= parseInt(max_length)) {
      setErrorMessage("Minimum length should be less than maximum length."); // Set error message for min/max length validation
    } else {
      console.log("summarizing...");
      await dispatch(
        addInChat({
          id: id,
          body: {
            text: text,
            min_length: min_length,
            max_length: max_length,
            summary_diversity: summary_diversity,
          },
        })
      );
      await dispatch(getChats());
    }
  };
  return (
    <form className="summarizer-form" onSubmit={handleSummarization}>
      <div className="features">
        <div className="lab-inp">
          <label>min words</label>
          <input
            type="number"
            value={min_length}
            onChange={(e) => setMin_length(e.target.value)}
          />
        </div>

        <div className="lab-inp">
          <label>max words</label>
          <input
            type="number"
            value={max_length}
            onChange={(e) => setMax_length(e.target.value)}
          />
        </div>

        <div className="lab-inp">
          <label>Diversity:</label>
          <select
            value={summary_diversity}
            onChange={(e) => setSummary_diversity(e.target.value)}
          >
            <option value={false}>Concise</option>
            <option value={true}>Creative</option>
          </select>
        </div>
      </div>
      <div className="inputbtn">
        <textarea type="text" onChange={(e) => setText(e.target.value)} />
        <button type="submit" disabled={isLoading} className="btn">
          <SendRoundedIcon />
        </button>
      </div>
    </form>
  );
};

export default SummarizerForm;
