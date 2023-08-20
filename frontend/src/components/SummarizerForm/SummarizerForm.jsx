import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SummarizerForm.css";
import { addInChat, getChat, getChats } from "../../store/apiCalls/chat";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Toast from "../toast/Toast";
const SummarizerForm = ({ id }) => {
  const textRef = useRef(null);
  const { isLoading, error } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [text, setText] = useState("");
  const [summary_diversity, setSummary_diversity] = useState(false);
  const [min_length, setMin_length] = useState(30);
  const [max_length, setMax_length] = useState(130);
  const [words, setWords] = useState(0);
  useEffect(() => {
    if (errorMessage !== "" || error) {
      if (error) {
        setErrorMessage(error);
      }
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, error]);

  const countWords = (paragraph) => {
    const words = paragraph.trim().split(/\s+/);
    return words.length;
  };
  const handleSummarization = async (e) => {
    e.preventDefault();

    if (
      text.trim() === "" ||
      min_length === "" ||
      max_length === "" ||
      summary_diversity === ""
    ) {
      setErrorMessage("Please complete all fields.");
    } else if (countWords(text) <= min_length) {
      setErrorMessage("Text is already concise.");
    } else if (countWords(text) <= max_length) {
      setErrorMessage("Summarized text should have fewer max words.");
    } else if (parseInt(min_length) >= parseInt(max_length)) {
      setErrorMessage("Min words should be less than max words.");
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
    <>
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
          <>
            <textarea
              type="text"
              onChange={(e) => {
                setText(e.target.value);
                setWords(countWords(e.target.value));
              }}
            />
            <div className="word-count">{words}</div>
          </>
          {isLoading ? (
            " ... "
          ) : (
            <button type="submit" disabled={isLoading} className="btn">
              <SendRoundedIcon />
            </button>
          )}
        </div>
      </form>{" "}
      {errorMessage !== "" && <Toast error={errorMessage} />}
    </>
  );
};

export default SummarizerForm;
