import { Link } from "react-router-dom";
import "./SmallChat.css";

const SmallChat = ({ chat }) => {
  return (
    <Link to={`/dashboard/${chat._id}`} className="small-chat">
      {chat.title}
    </Link>
  );
};

export default SmallChat;
