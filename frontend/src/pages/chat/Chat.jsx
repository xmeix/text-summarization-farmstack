import "./Chat.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteChat, getChat, getChats } from "../../store/apiCalls/chat";
import TextSummary from "../../components/TextSummary";
import SummarizerForm from "../../components/SummarizerForm/SummarizerForm";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import Toast from "../../components/toast/Toast";
const Chat = () => {
  const { id } = useParams();
  const { chats, error } = useSelector((state) => state.chat);
  const navigate = useNavigate();
  const chat = chats?.filter((c) => c._id === id)[0];
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error !== null) {
      setErrorMessage(error);
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleDeleteChat = async () => {
    await dispatch(deleteChat(chat._id));
    await dispatch(getChats());
    if (error === null && chat._id === id) {
      const next = chats?.filter((c) => c._id !== id)[0];
      if (next) navigate(`/dashboard/${next._id}`);
      else navigate("/dashboard/");
    }
  };

  return (
    <div className="chat">
      <div className="chats-container">
        <div className="current-chat">{chat?.title}</div>
        {chats.map((c, i) => (
          <div key={i}>
            <div className="chat-box">
              <NavLink to={`/dashboard/${c._id}`}>{c.title}</NavLink>
              <ClearRoundedIcon
                className="chat-box-btn"
                onClick={handleDeleteChat}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="chat-ts-container">
        {chat?.texts_summaries?.map((ts, i) => (
          <TextSummary key={i} text={ts.text} summary={ts.summary} />
        ))}
      </div>
      <SummarizerForm id={id} />
      {error !== null && <Toast error={errorMessage} />}
    </div>
  );
};

export default Chat;
