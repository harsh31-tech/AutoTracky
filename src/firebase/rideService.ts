import { get, ref, onValue } from "firebase/database";

import { database } from "./database";

export interface Ride {
  bleId: string;
  deviceName: string;
  detected: boolean;
  status: string;
  lastDetected: number;
}

export const findRide = async (deviceName: string): Promise<Ride | null> => {
  const rideRef = ref(database, `rides/${deviceName}`);

  const snapshot = await get(rideRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.val() as Ride;
};

export const listenToRide = (
  deviceName: string,
  callback: (ride: Ride) => void,
) => {
  const rideRef = ref(database, `rides/${deviceName}`);

  return onValue(rideRef, (snapshot) => {
    if (!snapshot.exists()) {
      return;
    }

    callback(snapshot.val() as Ride);
  });
};
