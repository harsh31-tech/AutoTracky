import { getDatabase } from "firebase/database";
import { firebaseApp } from "./config";

export const database = getDatabase(firebaseApp);
