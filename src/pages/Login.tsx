import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main>
      <h1>Login</h1>
      <form>
        <label htmlFor="login-email">Email</label>
        <input id="login-email" type="email" required />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" required />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Create an account</Link>
    </main>
  );
}
