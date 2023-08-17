import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="register-page">
      <h1> RegisterPage</h1>
      <Link href="/login">
        <button>You already have an account</button>
      </Link>
    </div>
  );
};

export default RegisterPage;
