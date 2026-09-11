import {
  get,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";

import { database } from "./database";

import type { LostAndFoundRequest } from "../types";

export interface CreateLostRequestData {
  rideId: string;
  bleId: string;
  deviceName: string;
  autoId: string;
  passengerId: string;
  itemName: string;
  description: string;
}

/**
 * Create a new lost & found request
 */
export const createLostAndFoundRequest = async (
  data: CreateLostRequestData,
): Promise<string> => {
  const requestsRef = ref(database, "lostAndFound");

  const newRequestRef = push(requestsRef);

  const requestId = newRequestRef.key;

  if (!requestId) {
    throw new Error("Unable to create request ID.");
  }

  const now = Date.now();

  const request: LostAndFoundRequest = {
    id: requestId,

    rideId: data.rideId,

    bleId: data.bleId,

    deviceName: data.deviceName,

    autoId: data.autoId,

    passengerId: data.passengerId,

    itemName: data.itemName,

    description: data.description,

    status: "pending",

    priority: "high",

    createdAt: now,

    updatedAt: now,

    driverResponse: "",
  };

  await set(newRequestRef, request);

  return requestId;
};

/**
 * Get all lost & found requests
 * belonging to a particular passenger
 */
export const getPassengerLostRequests = async (
  passengerId: string,
): Promise<LostAndFoundRequest[]> => {
  const requestsRef = ref(database, "lostAndFound");

  const snapshot = await get(requestsRef);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();

  const requests: LostAndFoundRequest[] = [];

  Object.entries(data).forEach(([id, value]) => {
    const request =
      value as Omit<LostAndFoundRequest, "id">;

    if (request.passengerId === passengerId) {
      requests.push({
        id,
        ...request,
      });
    }
  });

  requests.sort(
    (a, b) => b.createdAt - a.createdAt,
  );

  return requests;
};

/**
 * Realtime listener for passenger's lost & found requests
 */
export const listenToPassengerLostRequests = (
  passengerId: string,
  callback: (
    requests: LostAndFoundRequest[],
  ) => void,
) => {
  const requestsRef = ref(
    database,
    "lostAndFound",
  );

  return onValue(requestsRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }

    const data = snapshot.val();

    const requests: LostAndFoundRequest[] = [];

    Object.entries(data).forEach(
      ([id, value]) => {
        const request =
          value as Omit<
            LostAndFoundRequest,
            "id"
          >;

        if (
          request.passengerId === passengerId
        ) {
          requests.push({
            id,
            ...request,
          });
        }
      },
    );

    requests.sort(
      (a, b) =>
        b.createdAt - a.createdAt,
    );

    callback(requests);
  });
};