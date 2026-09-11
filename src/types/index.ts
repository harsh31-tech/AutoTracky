export interface BleDevice {
  id: string;
  name: string;
}

export interface UserProfile {
  name: string;
  mobile: string;
  email: string;
  bleId: string;
  deviceName: string;
}

export interface Detection {
  id: string;
  bleId: string;
  deviceName: string;
  vehicleId: string;
  esp32Id: string;
  rssi: number;
  timestamp: number;
}

export interface LostAndFoundRequest {
  id: string;

  rideId: string;

  bleId: string;

  deviceName: string;

  autoId: string;

  passengerId: string;

  itemName: string;

  description: string;

  status:
    | "pending"
    | "accepted"
    | "found"
    | "not_found"
    | "returned";

  priority: "high";

  createdAt: number;

  updatedAt: number;

  driverResponse: string;
}