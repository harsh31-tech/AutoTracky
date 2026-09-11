import type { BleDevice } from "../types";

type BluetoothNavigator = Navigator & {
  bluetooth: {
    requestDevice(options: { acceptAllDevices: boolean }): Promise<{
      id: string;
      name?: string;
    }>;
  };
};

export async function requestBleDevice(): Promise<BleDevice> {
  if (!("bluetooth" in navigator)) {
    throw new Error("Web Bluetooth is not supported in this browser.");
  }

  const device = await (
    navigator as BluetoothNavigator
  ).bluetooth.requestDevice({ acceptAllDevices: true });
  return { id: device.id, name: device.name ?? "Unnamed device" };
}
