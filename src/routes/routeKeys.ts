// primitives
export const homeRoute = "/";
export const forumRoute = "/forum";
export const authRoute = "/auth";

// functions
export const forumCategoryRoute = (category: string = ":category") =>
  `${forumRoute}/${category}`;
export const forumTopicRoute = (topicCat: string = ":topicCat") =>
  `${forumRoute}/${topicCat}`;
export const forumUsercRoute = (userCat: string = ":userCat") =>
  `${forumRoute}/${userCat}`;
