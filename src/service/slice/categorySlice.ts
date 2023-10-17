import {
  createSelector,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { CategoryModel } from "../../models/category/categoryModel";
import { categoriesEndpoint } from "../apiEndpoints";
import { blogApi, errorHandler, ErrorResponseModel } from "../apiSlice";
import { RootState } from "@reduxjs/toolkit/query";

// tags
import { categoriesTag } from "../queryTags";

const adapter = createEntityAdapter<CategoryModel>();

const initialState = adapter.getInitialState();

export const categorySlice = blogApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryModel[], void>({
      query: () => ({ url: categoriesEndpoint }),
      transformResponse: (response: { categories: CategoryModel[] }) => {
        // return adapter.setAll(initialState,  response.categories)
        return response.categories;
      },
      transformErrorResponse: (response: ErrorResponseModel) => {
        const errorStatus: number =
          typeof response.status === "string"
            ? response.originalStatus
            : response.status;
        return errorHandler(errorStatus, response);
      },
      providesTags: [categoriesTag],
    }),
  }),
});

// export const categoriesResult = categorySlice.endpoints.getCategories.select();
// export const getCategoriesResult = createSelector(
//   categoriesResult,
//   (catResult) => catResult ?? []
// );

// export const  {} = adapter.getSelectors((state) => getCategoriesResult(state) ?? initialState)
export const { useGetCategoriesQuery, useLazyGetCategoriesQuery } =
  categorySlice;
