import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";
import SmallChat from "../../components/SmallChat";
import { useEffect } from "react";
import { getChats } from "../../store/apiCalls/chat";
const Dashboard = () => {
  const { isLoggedIn, isLoading, error, user } = useSelector(
    (state) => state.auth
  );
  const { chats } = useSelector((state) => state.chat);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Your summaries</h1>
      <h1 className="ts-container">
        {chats?.map((chat, i) => (
          <SmallChat key={i} chat={chat} />
        ))}
      </h1>
    </div>
  );
};

export default Dashboard;
