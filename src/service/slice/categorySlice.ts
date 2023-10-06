import { CategoryModel } from "../../models/category/categoryModel";
import { categoriesEndpoint } from "../../utils/apiEndpoints";
import { blogApi } from "../apiSlice";

// tags
import { categoriesTag } from "../queryTags";

export const categorySlice = blogApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryModel[], void>({
      query: () => ({ url: categoriesEndpoint }),
      transformResponse: (response: { categories: CategoryModel[] }) =>
        response.categories,
      transformErrorResponse: (response: {
        data: { message: string };
        status: number;
      }) => ({ message: response.data.message, status: response.status }),
      providesTags: [categoriesTag],
    }),
  }),
});

export const { useGetCategoriesQuery } = categorySlice;
