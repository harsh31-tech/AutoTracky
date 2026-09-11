import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main>
      <h1>Welcome to autoTracky</h1>
      <p>Track your vehicle and connected devices in one place.</p>
      <Link to="/register">Get started</Link>
    </main>
  );
}
