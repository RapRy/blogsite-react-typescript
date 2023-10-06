import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

// slice
import { useGetCategoriesQuery } from "../../../service/slice/categorySlice";

// texts
import { categoriesText } from "../../../utils/string";
import { forumCategoryRoute } from "../../../routes/routeKeys";

// helpers
import { replaceAllSpaceWithHyphen } from "../../../utils/helpers/stringManipulate";

const CategoriesMenu = () => {
  const { data: categoryList, isLoading, error } = useGetCategoriesQuery();

  console.log("test");

  return (
    <>
      <Typography
        variant="h6"
        sx={(theme) => ({
          fontWeight: 500,
          color: theme.palette.common.white,
          fontSize: ".85rem",
          marginBottom: 2,
        })}
      >
        {categoriesText}
      </Typography>
      {categoryList &&
        categoryList.map((item, i) => (
          <Link
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
