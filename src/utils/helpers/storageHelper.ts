import { AuthModel } from "../../models/user_model/authModel";
import { user_credentials_key } from "../string";

export function getUserCredential(
  isSession: boolean = false
): AuthModel | null {
  const value: string | null = isSession
    ? sessionStorage.getItem(user_credentials_key)
    : localStorage.getItem(user_credentials_key);
  if (value) {
    const userCredentials: AuthModel = JSON.parse(value);

    return userCredentials;
  }
  return null;
}

export function saveToStorage(
  key: string,
  value: any,
  isSession: boolean = false
): void {
  if (isSession) {
    sessionStorage.setItem(key, JSON.stringify(value));
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}
