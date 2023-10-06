import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/apiEndpoints";
import { categoriesTag } from "./queryTags";
import { getUserCredential } from "../utils/helpers/storageHelper";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const user = getUserCredential();

      if (user) {
        headers.set("Authorization", `Bearer ${user.token}`);
      }

      return headers;
    },
  }),
  tagTypes: [categoriesTag],
  endpoints: () => ({}),
});
