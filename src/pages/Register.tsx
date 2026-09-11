import { Link } from "react-router-dom";

export default function Register() {
  return (
    <main>
      <h1>Create an account</h1>
      <form>
        <label htmlFor="register-email">Email</label>
        <input id="register-email" type="email" required />
        <label htmlFor="register-password">Password</label>
        <input id="register-password" type="password" required />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already have an account?</Link>
    </main>
  );
}
