import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, statisticsEndpoint } from "./apiEndpoints";
import {
  categoriesTag,
  latestTopicsSideMenuTag,
  hotTopicsSideMenuTag,
  statisticCountTag,
  newUsersDashboardTag,
  activeUsersDashboardTag,
} from "./queryTags";
import { getUserCredential } from "../utils/helpers/storageHelper";
import { StatisticCountModel } from "../models/StatisticCountModel";

export interface ErrorResponseModel {
  data: { message: string };
  status: number;
  originalStatus: number;
}

export const errorHandler = (
  errorStatus: number,
  response: ErrorResponseModel
) => {
  switch (errorStatus) {
    case 404:
      return { data: "Something went wrong!", status: response.status };
    default:
      return { data: response.data.message, status: response.status };
  }
};

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
  tagTypes: [
    categoriesTag,
    latestTopicsSideMenuTag,
    hotTopicsSideMenuTag,
    statisticCountTag,
    newUsersDashboardTag,
    activeUsersDashboardTag,
  ],
  endpoints: (builder) => ({
    getStatisticCount: builder.query<StatisticCountModel, void>({
      query: () => ({ url: statisticsEndpoint }),
      transformErrorResponse: (response: ErrorResponseModel) => {
        const errorStatus: number =
          typeof response.status === "string"
            ? response.originalStatus
            : response.status;
        return errorHandler(errorStatus, response);
      },
    }),
  }),
});

export const { useGetStatisticCountQuery } = blogApi;
