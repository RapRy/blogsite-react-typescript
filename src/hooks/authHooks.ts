import { useState, useEffect } from "react";
import { AuthModel } from "../models/user_model/authModel";
import { getUserCredential } from "../utils/helpers/storageHelper";

export const useUserCredentials = (): AuthModel | null => {
  const [user, setUser] = useState<AuthModel | null>(null);
  const localStorageProfile = getUserCredential();

  useEffect(() => {
    setUser(localStorageProfile);
  }, [localStorageProfile]);

  return user;
};
