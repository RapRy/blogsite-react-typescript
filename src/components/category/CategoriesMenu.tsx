import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

// slice
import { useGetCategoriesQuery } from "../../service/slice/categorySlice";

// texts
import { categoriesText } from "../../utils/string";
import { forumCategoryRoute } from "../../routes/routeKeys";

// helpers
import { replaceAllSpaceWithHyphen } from "../../utils/helpers/stringManipulate";

//components
import { LoaderCircular } from "../common/Loaders";
import { showToastError } from "../common/ErrorComponents";
import { categoriesTag } from "../../service/queryTags";

const CategoriesMenu = () => {
  const { data: categoryList, isLoading, error } = useGetCategoriesQuery();

  if (error) {
    showToastError({ error: error, toastId: categoriesTag });
  }

  if (isLoading) {
    return <LoaderCircular />;
  }

  return (
    <>
      <Typography
        variant="h6"
        sx={(theme) => ({
          fontWeight: 500,
          color: theme.palette.common.white,
          fontSize: ".85rem",
          marginBottom: 2,
          textAlign: "left",
        })}
      >
        {categoriesText}
      </Typography>
      {categoryList &&
        categoryList.map((item, i) => (
          <Link
            key={i}
            to={forumCategoryRoute(
              replaceAllSpaceWithHyphen(item.name.toLowerCase())
            )}
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              variant="body1"
              sx={(theme) => ({
                color: theme.palette.common.white,
                textTransform: "capitalize",
                fontWeight: theme.typography.fontWeightBold,
                fontSize: ".8rem",
                textAlign: "left",
                padding: theme.spacing(1, 2),
                borderRadius: 1,
                transition: theme.transitions.create(["background-color"]),
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              })}
            >
              {item.name}
            </Typography>
          </Link>
        ))}
    </>
  );
};

export default CategoriesMenu;
