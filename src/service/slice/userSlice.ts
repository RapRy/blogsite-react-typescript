import { blogApi, errorHandler, ErrorResponseModel } from "../apiSlice";
import { newUsers, activeUsers } from "../apiEndpoints";
import { UserModel } from "../../models/user_model/userModel";
import { newUsersDashboardTag, activeUsersDashboardTag } from "../queryTags";

export const userSlice = blogApi.injectEndpoints({
  endpoints: (builder) => ({
    getNewUsers: builder.query<UserModel[], number>({
      query: (limit) => ({ url: newUsers(limit) }),
      transformErrorResponse: (response: ErrorResponseModel) => {
        const errorStatus: number =
          typeof response.status === "string"
            ? response.originalStatus
            : response.status;
        return errorHandler(errorStatus, response);
      },
      providesTags: [newUsersDashboardTag],
    }),
    getActiveUsers: builder.query<UserModel[], number>({
      query: (limit) => ({ url: activeUsers(limit) }),
      transformErrorResponse: (response: ErrorResponseModel) => {
        const errorStatus: number =
          typeof response.status === "string"
            ? response.originalStatus
            : response.status;
        return errorHandler(errorStatus, response);
      },
      providesTags: [activeUsersDashboardTag],
    }),
  }),
});

export const { useGetNewUsersQuery, useGetActiveUsersQuery } = userSlice;
