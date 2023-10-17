import { useEffect, useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import _ from "lodash";
import PeopleIcon from "@mui/icons-material/People";
import FolderIcon from "@mui/icons-material/Folder";
import ForumIcon from "@mui/icons-material/Forum";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { SvgIconProps } from "@mui/material/SvgIcon";

import { LoaderCircular } from "../common/Loaders";
import { useGetStatisticCountQuery } from "../../service/apiSlice";
import { forumStatisticText } from "../../utils/string";
import { showToastError } from "../common/ErrorComponents";
import { statisticCountTag } from "../../service/queryTags";
import { StatisticsLabel } from "../../utils/enums";
import { ModifiedStatModel } from "../../models/StatisticCountModel";

const setIcon = (name: string): React.ReactElement<SvgIconProps> => {
  switch (name) {
    case StatisticsLabel.registeredUsers:
      return (
        <PeopleIcon
          fontSize="large"
          sx={(theme) => ({
            color: theme.palette.primary.main,
            verticalAlign: "bottom",
          })}
        />
      );
    case StatisticsLabel.activeCategories:
      return (
        <FolderIcon
          fontSize="large"
          sx={(theme) => ({
            color: theme.palette.secondary.main,
            verticalAlign: "bottom",
          })}
        />
      );
    case StatisticsLabel.topics:
      return (
        <ForumIcon
          fontSize="large"
          sx={(theme) => ({
            color: theme.palette.secondary.main,
            verticalAlign: "bottom",
          })}
        />
      );
    case StatisticsLabel.upvotes:
      return (
        <ThumbUpAltIcon
          fontSize="large"
          sx={(theme) => ({
            color: theme.palette.secondary.main,
            verticalAlign: "bottom",
          })}
        />
      );
    case StatisticsLabel.downvotes:
      return (
        <ThumbDownAltIcon
          fontSize="large"
          sx={(theme) => ({
            color: theme.palette.secondary.main,
            verticalAlign: "bottom",
          })}
        />
      );
    default:
      return <ForumIcon />;
  }
};

const getEnumLabel = (name: string): string => {
  switch (name) {
    case "activeCategories":
      return StatisticsLabel.activeCategories;
    case "registeredUsers":
      return StatisticsLabel.registeredUsers;
    case "topics":
      return StatisticsLabel.topics;
    case "downvotes":
      return StatisticsLabel.downvotes;
    case "upvotes":
      return StatisticsLabel.upvotes;
    default:
      return StatisticsLabel.default;
  }
};

const StatsPanel = () => {
  const [statisticsList, setStatisticList] = useState<ModifiedStatModel[]>([]);
  const { data, isLoading, error } = useGetStatisticCountQuery();

  if (error) {
    showToastError({ error, toastId: statisticCountTag });
  }

  useEffect(() => {
    if (data) {
      const statsArray: ModifiedStatModel[] = [];
      for (const key in data) {
        const label = getEnumLabel(key);
        const index = key as keyof typeof data;
        if (!_.isEmpty(label)) {
          const statObject: ModifiedStatModel = {
            colorType: label === "Members" ? "primary" : "secondary",
            count: data[index],
            text: label,
            allUserCount: null,
            icon: setIcon(label),
          };
          statsArray.push(statObject);
        }
      }
      setStatisticList(statsArray);
    }
  }, [data]);

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
    <Box
      sx={(theme) => ({
        marginBottom: theme.spacing(4),
      })}
    >
      <Typography
        variant="body1"
        sx={(theme) => ({
          color: theme.palette.secondary.dark,
          fontSize: ".9rem",
          fontWeight: theme.typography.fontWeightBold,
          textTransform: "uppercase",
          marginBottom: theme.spacing(1),
          textAlign: "left",
        })}
      >
        {forumStatisticText}
      </Typography>
      {statisticsList.map((item, i) => (
        <Box
          key={i}
          sx={(theme) => ({
            borderRadius: theme.shape.borderRadius,
            padding: theme.spacing(2),
            margin: theme.spacing(0, 2, 2, 0),
            display: "inline-block",
            background: theme.palette.common.white,
          })}
        >
          {item.icon}
          <Typography
            variant="h1"
            sx={(theme) => ({
              fontWeight: theme.typography.fontWeightBold,
              fontSize: "2.2rem",
              display: "inline-block",
              textAlign: "right",
              paddingLeft: theme.spacing(2),
              color:
                item.colorType === "primary"
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main,
            })}
          >
            {String(item.count)}
          </Typography>
          <Typography
            variant="body1"
            sx={(theme) => ({
              textAlign: "left",
              fontSize: ".9rem",
              color: theme.palette.common.black,
              fontWeight: theme.typography.fontWeightBold,
              textTransform: "uppercase",
            })}
          >
            {item.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default StatsPanel;
