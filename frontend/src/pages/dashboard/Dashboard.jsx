import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";
import SmallChat from "../../components/SmallChat";
import { useEffect, useState } from "react";
import { addChat, getChats } from "../../store/apiCalls/chat";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
const Dashboard = () => {
  const { isLoggedIn, isLoading, error, user } = useSelector(
    (state) => state.auth
  );
  const [chatTitle, setChatTitle] = useState("");
  const { chats } = useSelector((state) => state.chat);
  const [ErrorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const handleAddChat = async () => {
    if (chatTitle.trim() !== "") {
      await dispatch(addChat({ title: chatTitle }));
      await dispatch(getChats());
    } else {
      setErrorMessage("Please fill in all fields.");
    }
  };
  return (
    <div className="dashboard">
      <div className="dash-head">
        <div className="dash-head-elements">
          <h1 className="dashboard-title">Your summaries</h1>
          <div
            style={{
              display: "flex",
              gap: "0.5em",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <input type="text" onChange={(e) => setChatTitle(e.target.value)} />
            <button onClick={handleAddChat} className="icon-btn">
              <AddRoundedIcon />
            </button>
          </div>
        </div>
      </div>
      <h1 className="ts-container">
        {chats?.map((chat, i) => (
          <SmallChat key={i} chat={chat} />
        ))}
      </h1>
    </div>
  );
};

export default Dashboard;
