import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";
import SmallChat from "../../components/SmallChat";
import { useEffect, useState } from "react";
import { addChat, getChats } from "../../store/apiCalls/chat";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Error from "../../components/Error/Error";
import Toast from "../../components/toast/Toast";
import Empty from "../../components/Empty/Empty";
const Dashboard = () => {
  const { isLoggedIn, isLoading, error, user } = useSelector(
    (state) => state.auth
  );
  const [chatTitle, setChatTitle] = useState("");
  const { chats } = useSelector((state) => state.chat);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(chats);
  useEffect(() => {
    if (errorMessage !== "") {
      // setErrorMessage(error);
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const dispatch = useDispatch();

  const handleAddChat = async () => {
    if (chatTitle.trim() !== "") {
      await dispatch(addChat({ title: chatTitle }));
      await dispatch(getChats());
    } else {
      setErrorMessage("Please fill the title field.");
    }
  };
  return (
    <div className="dashboard">
      <div className="dash-head">
        <div className="dash-head-elements">
          <h1 className="dashboard-title">Your chats</h1>
          <div
            style={{
              display: "flex",
              gap: "0.5em",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <input
              type="text"
              onChange={(e) => setChatTitle(e.target.value)}
              placeholder="write chat name"
            />
            <button onClick={handleAddChat} className="icon-btn">
              <AddRoundedIcon />
            </button>
          </div>
        </div>
      </div>
      <h1 className="ts-container">
        {chats.length !== 0 ? (
          chats?.map((chat, i) => <SmallChat key={i} chat={chat} />)
        ) : (
          <Empty field={"chats"} />
        )}
      </h1>{" "}
      {errorMessage !== "" && <Toast error={errorMessage} />}
    </div>
  );
};

export default Dashboard;
