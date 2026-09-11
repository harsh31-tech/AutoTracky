import { ref, set, get } from "firebase/database";

import { database } from "../firebase/database";

import type { UserProfile } from "../types";

export async function createUserProfile(
  uid: string,
  profile: UserProfile
) {
  await set(
    ref(database, `users/${uid}`),
    profile
  );
}

export async function getUserProfile(
  uid: string
): Promise<UserProfile | null> {
  const snapshot = await get(
    ref(database, `users/${uid}`)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.val() as UserProfile;
}