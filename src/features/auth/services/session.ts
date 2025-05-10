import { StorageKeys, UserSessionData } from "../types/session";

const session = {
  get: (): UserSessionData | null => {
    const sessionString = localStorage.getItem(StorageKeys.SessionData);
    if (!sessionString) {
      return null;
    }

    try {
      return base64ToJSON(sessionString);
    } catch (error) {
      console.error("Failed to parse session data:", error);
      return null;
    }
  },
  set: (token: string) => localStorage.setItem(StorageKeys.SessionData, token),
  remove: () => localStorage.removeItem(StorageKeys.SessionData),
};

function base64ToJSON<T>(string: string): T {
  try {
    return JSON.parse(Buffer.from(string, "base64").toString("utf8")) as T;
  } catch (error) {
    console.error("Error decoding Base64 or parsing JSON:", error);
    throw error;
  }
}

export default session;
