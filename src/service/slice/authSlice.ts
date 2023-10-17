import {
  AuthModel,
  SignInFormdataType,
} from "../../models/user_model/authModel";
import { signInEndpoint } from "../apiEndpoints";
import { saveToStorage } from "../../utils/helpers/storageHelper";
import { user_credentials_key } from "../../utils/string";
import { blogApi } from "../apiSlice";

export const authSlice = blogApi.injectEndpoints({
  endpoints: (builder) => ({
    signInUser: builder.mutation<Partial<AuthModel>, SignInFormdataType>({
      query: (body) => ({
        url: signInEndpoint,
        method: "POST",
        body,
      }),
      transformResponse: (response: { result: any; token: string }) => {
        const userCredential: AuthModel = {
          ...response.result,
          token: response.token,
        };

        saveToStorage(user_credentials_key, userCredential);
        return userCredential;
      },
      transformErrorResponse: (response: {
        data: { message: string };
        status: number;
      }) => ({ data: response.data.message, status: response.status }),
    }),
  }),
});

export const { useSignInUserMutation } = authSlice;
