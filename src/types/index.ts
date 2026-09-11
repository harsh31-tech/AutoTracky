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
