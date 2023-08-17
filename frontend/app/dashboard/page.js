import Link from "next/link";
// here we send a request to get all chats by sending the users id
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Link href="/dashboard/:id">
        <button>Go to a certain chat</button>
      </Link>
    </div>
  );
};

export default Dashboard;
