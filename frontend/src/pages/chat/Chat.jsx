import "./Chat.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChat } from "../../store/apiCalls/chat";
import TextSummary from "../../components/TextSummary";
import SummarizerForm from "../../components/SummarizerForm/SummarizerForm";
const Chat = () => {
  const { id } = useParams();
  const { chats } = useSelector((state) => state.chat);

  const chat = chats?.filter((c) => c._id === id)[0];
  return (
    <div className="chat">
      <div className="chat-ts-container">
        {chat?.texts_summaries.map((ts, i) => (
          <TextSummary key={i} text={ts.text} summary={ts.summary} />
        ))}
      </div>
      <SummarizerForm id={id} />
    </div>
  );
};

export default Chat;
