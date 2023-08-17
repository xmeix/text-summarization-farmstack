import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1>Login page</h1>
      <Link href="/register">
        <button>You don't have an account</button>
      </Link>
    </div>
  );
};

export default LoginPage;
