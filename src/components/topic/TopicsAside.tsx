import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  List,
  Box,
  Typography,
  Stack,
  ListItemText,
  ListItemIcon,
  ListItem,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { skipToken } from "@reduxjs/toolkit/query";
import moment from "moment";

import {
  useGetLatestTopicsQuery,
  useGetHotTopicsQuery,
} from "../../service/slice/topicSlice";
import { useLazyGetCategoriesQuery } from "../../service/slice/categorySlice";

import { forumRoute, forumTopicRoute } from "../../routes/routeKeys";

//components
import { LoaderCircular } from "../common/Loaders";
import { showToastError } from "../common/ErrorComponents";
// models
import { TopicModel } from "../../models/topic/topicModel";

import { hotTopicsText, latestTopicsText } from "../../utils/string";
import { CategoryModel } from "../../models/category/categoryModel";
import { replaceAllSpaceWithHyphen } from "../../utils/helpers/stringManipulate";

const TopicsAside = ({
  textTitle,
  queryTag,
  routeName,
}: {
  textTitle: string;
  queryTag: string;
  routeName: string;
}) => {
  const {
    data: latestTopicsList,
    isLoading: latestIsLoading,
    error: latestError,
    isSuccess: latestIsSuccess,
  } = useGetLatestTopicsQuery(textTitle === latestTopicsText ? 5 : skipToken);
  const {
    data: hotTopicsList,
    isLoading: hotIsLoading,
    error: hotError,
    isSuccess: hotIsSuccess,
  } = useGetHotTopicsQuery(textTitle === hotTopicsText ? 5 : skipToken);
  const [
    getCategoriesTrigger,
    {
      data: categoriesList,
      isLoading: categoriesIsLoading,
      error: categoriesError,
    },
  ] = useLazyGetCategoriesQuery();

  const topicsList = latestTopicsList || hotTopicsList;
  const isLoading = latestIsLoading || hotIsLoading || categoriesIsLoading;
  const error = latestError || hotError || categoriesError;
  const isSuccess = latestIsSuccess || hotIsSuccess;

  const secondText = (topic: TopicModel) => {
    switch (textTitle) {
      case latestTopicsText:
        // return dateString(latest);
        return `added on ${moment(topic?.createdAt).format("MMM D YYYY")}`;
      case hotTopicsText:
        return `${topic?.meta?.replies?.length} Replies`;
      default:
        return null;
    }
  };

  const generateRoute = (topic: TopicModel) => {
    if (categoriesList) {
      const filteredCategory = categoriesList.find(
        (item) => item._id === topic.ref.category
      );
      return `${forumRoute}/${replaceAllSpaceWithHyphen(
        filteredCategory?.name as string
      )}/${topic._id}`;
    }

    return "/";
  };

  if (error) {
    showToastError({ error, toastId: queryTag });
  }

  useEffect(() => {
    if (isSuccess) {
      getCategoriesTrigger(undefined, true);
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ bgcolor: "#fff", padding: 5, borderRadius: 5, marginTop: 2 }}
      >
        <LoaderCircular color="secondary.dark" />
      </Stack>
    );
  }

  return (
    <Box padding={0} marginTop={2}>
      <Link
        style={{
          textDecoration: "none",
        }}
        to={forumTopicRoute(routeName)}
      >
        <Typography
          variant="h6"
          sx={(theme) => ({
            color: theme.palette.secondary.dark,
            fontSize: ".9rem",
            fontWeight: theme.typography.fontWeightBold,
            textTransform: "uppercase",
            marginBottom: theme.spacing(1),
            textAlign: "left",
          })}
        >
          {textTitle}
        </Typography>
      </Link>
      {topicsList && (
        <List
          sx={(theme) => ({
            borderRadius: theme.shape.borderRadius,
            padding: theme.spacing(1),
            backgroundColor: theme.palette.background.paper,
          })}
        >
          {topicsList.map((item, index) => (
            <Link
              key={index}
              to={generateRoute(item)}
              style={{
                textDecoration: "none",
              }}
            >
              <ListItem
                sx={(theme) => ({
                  padding: theme.spacing(1),
                  backgroundColor: theme.palette.background.paper,
                })}
              >
                <ListItemIcon
                  sx={{
                    display: "inline",
                    minWidth: 35,
                  }}
                >
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={item?.title}
                  secondary={secondText(item)}
                  sx={(theme) => ({
                    "& .MuiListItemText-primary": {
                      color: theme.palette.common.black,
                      fontSize: ".9rem",
                      fontWeight: theme.typography.fontWeightBold,
                      whiteSpace: "nowrap",
                      overflowX: "hidden",
                      textOverflow: "ellipsis",
                    },
                    "& .MuiListItemText-secondary": {
                      fontSize: ".7rem",
                      color: theme.palette.common.black,
                    },
                  })}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TopicsAside;
