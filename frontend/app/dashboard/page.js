import Link from "next/link";

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
