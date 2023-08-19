import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SummarizerForm.css";
import { addInChat, getChat, getChats } from "../../store/apiCalls/chat";
const SummarizerForm = ({ id }) => {
  const textRef = useRef(null);
  const { isLoading } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const handleSummarization = async (e) => {
    e.preventDefault();
    console.log("summarizing...");
    const text = textRef.current.value;
    if (text !== "" && id !== "") {
      console.log(id);
      await dispatch(addInChat({ id: id, body: text }));
      await dispatch(getChats());
    }
  };
  return (
    <form className="summarizer-form" onSubmit={handleSummarization}>
      <div className="inputbtn">
        <textarea type="text" ref={textRef} />
        <button type="submit" disabled={isLoading}>
          summarize
        </button>
      </div>
    </form>
  );
};

export default SummarizerForm;
