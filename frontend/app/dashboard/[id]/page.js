import TextSumForm from "@/app/components/TextSumForm";
import TextSummary from "@/app/components/TextSummary";
import Link from "next/link";

const ChatPage = ({ params }) => {
  const chatId = params.id;

  return (
    <div className="chat-page">
      <Link href="/dashboard">
        <button>Go back to dashboard</button>
      </Link>
      <h1>Chat page number {chatId}</h1>
      <div className="chatTS">
        <TextSummary />
        <TextSummary />
      </div>
      <TextSumForm />
    </div>
  );
};

export default ChatPage;
