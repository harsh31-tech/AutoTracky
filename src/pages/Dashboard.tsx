import { generateBleId } from "../utils/generateBleId";

export default function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <p>Connected device: {generateBleId()}</p>
    </main>
  );
}
