import Link from "next/link";

const ChatPage = () => {
  return (
    <div className="chat-page">
      <h1>Chat page</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, hic.</p>
      <Link href="/dashboard">
        <button>Go back to dashboard</button>
      </Link>
    </div>
  );
};

export default ChatPage;
