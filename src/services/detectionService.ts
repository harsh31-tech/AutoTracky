import { onValue, orderByChild, query, ref } from "firebase/database";

import { database } from "../firebase/database";

import type { Detection } from "../types";

export function listenToUserDetections(
  bleId: string,
  callback: (detections: Detection[]) => void,
) {
  const detectionsRef = query(
    ref(database, "detections"),
    orderByChild("bleId"),
  );

  const unsubscribe = onValue(detectionsRef, (snapshot) => {
    const detections: Detection[] = [];

    snapshot.forEach((child) => {
      const data = child.val();

      if (data.bleId === bleId) {
        detections.push({
          id: child.key ?? "",
          bleId: data.bleId,
          vehicleId: data.vehicleId,
          esp32Id: data.esp32Id,
          rssi: data.rssi,
          timestamp: data.timestamp,
          deviceName: data.deviceName ?? "",
        });
      }
    });

    detections.sort((a, b) => b.timestamp - a.timestamp);

    callback(detections);
  });

  return unsubscribe;
}
