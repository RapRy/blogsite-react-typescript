export const baseUrl: string = "https://simple-blog-r440.onrender.com";
export const signInEndpoint: string = "/users/signin";
export const categoriesEndpoint: string = "/categories";
export const statisticsEndpoint: string = "/statistics/all-stats-count";
export const latestTopics = (limit: number): string =>
  `/topics/latest/limit/${limit}`;
export const hotTopics = (limit: number): string =>
  `/topics/hot/limit/${limit}`;
export const newUsers = (limit: number): string => `/users/newUsers/${limit}`;
export const activeUsers = (limit: number): string =>
  `/users/activeUsers/${limit}`;
