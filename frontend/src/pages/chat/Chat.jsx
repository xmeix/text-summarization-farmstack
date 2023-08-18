import { useParams } from "react-router-dom";

const Chat = () => {
  const { id } = useParams();
  return <div className="chat">chat page {id}</div>;
};

export default Chat;
