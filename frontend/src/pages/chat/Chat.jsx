import "./Chat.css";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChat } from "../../store/apiCalls/chat";
import TextSummary from "../../components/TextSummary";
import SummarizerForm from "../../components/SummarizerForm/SummarizerForm";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
const Chat = () => {
  const { id } = useParams();
  const { chats } = useSelector((state) => state.chat);

  const chat = chats?.filter((c) => c._id === id)[0];
  return (
    <div className="chat">
      <div className="chats-container">
        {chats.map((c, i) => (
          <div key={i}>
            <div className="chat-box">
              <NavLink to={`/dashboard/${c._id}`}>{c.title}</NavLink>
              <ClearRoundedIcon className="chat-box-btn" />
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
    </div>
  );
};

export default Chat;
