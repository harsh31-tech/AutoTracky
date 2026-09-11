export interface UserProfile {
  name: string;
  mobile: string;
  email: string;
  bleId: string;
}

export interface Detection {
  bleId: string;
  vehicleId: string;
  esp32Id: string;
  rssi: number;
  timestamp: number;
}
export interface Detection {
  id: string;
  bleId: string;
  vehicleId: string;
  esp32Id: string;
  rssi: number;
  timestamp: number;
}
