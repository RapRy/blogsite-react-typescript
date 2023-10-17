import { hotTopics, latestTopics } from "../apiEndpoints";
import { blogApi, errorHandler, ErrorResponseModel } from "../apiSlice";
import { TopicModel } from "../../models/topic/topicModel";

import { latestTopicsSideMenuTag, hotTopicsSideMenuTag } from "../queryTags";

export const topicSlice = blogApi.injectEndpoints({
  endpoints: (builder) => ({
    getLatestTopics: builder.query<TopicModel[], number>({
      query: (limit) => ({
        url: latestTopics(limit),
      }),
      transformErrorResponse: (response: ErrorResponseModel) => {
        const errorStatus: number =
          typeof response.status === "string"
            ? response.originalStatus
            : response.status;
        return errorHandler(errorStatus, response);
      },
      providesTags: [latestTopicsSideMenuTag],
    }),
    getHotTopics: builder.query<TopicModel[], number>({
      query: (limit) => ({
        url: hotTopics(limit),
      }),
      transformErrorResponse: (response: ErrorResponseModel) => {
        const errorStatus: number =
          typeof response.status === "string"
            ? response.originalStatus
            : response.status;
        return errorHandler(errorStatus, response);
      },
      providesTags: [hotTopicsSideMenuTag],
    }),
  }),
});

export const { useGetLatestTopicsQuery, useGetHotTopicsQuery } = topicSlice;
