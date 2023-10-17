import moment from "moment";
import { Link } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Grid,
  Avatar,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ForumIcon from "@mui/icons-material/Forum";
import CommentIcon from "@mui/icons-material/Comment";
import { forumUsercRoute } from "../../routes/routeKeys";
import { replaceAllSpaceWithHyphen } from "../../utils/helpers/stringManipulate";

import {
  useGetNewUsersQuery,
  useGetActiveUsersQuery,
} from "../../service/slice/userSlice";
import {
  activeUsersDashboardTag,
  newUsersDashboardTag,
} from "../../service/queryTags";
import { showToastError } from "../common/ErrorComponents";
import { LoaderCircular } from "../common/Loaders";

const UsersPanelDashboard = ({
  title,
  queryTag,
}: {
  title: string;
  queryTag: string;
}) => {
  const {
    data: newUserList,
    isLoading: newUserIsLoading,
    error: newUserError,
  } = useGetNewUsersQuery(queryTag === newUsersDashboardTag ? 10 : skipToken);
  const {
    data: activeUserList,
    isLoading: activeUserIsLoading,
    error: activeUserError,
  } = useGetActiveUsersQuery(
    queryTag === activeUsersDashboardTag ? 10 : skipToken
  );

  const userList = newUserList || activeUserList;
  const isLoading = newUserIsLoading || activeUserIsLoading;
  const error = newUserError || activeUserError;

  if (error) {
    showToastError({ error, toastId: queryTag });
  }

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
        marginBottom: theme.spacing(6),
      })}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={2}
      >
        <Typography
          variant="body1"
          sx={(theme) => ({
            color: theme.palette.primary.dark,
            fontSize: ".9rem",
            fontWeight: theme.typography.fontWeightBold,
            textTransform: "uppercase",
          })}
        >
          {title}
        </Typography>
        <Link
          to={forumUsercRoute(replaceAllSpaceWithHyphen(title).toLowerCase())}
          style={{
            textDecoration: "none",
          }}
        ></Link>
      </Stack>
      <Grid container spacing={4}>
        {userList?.map((user, i) => (
          <Grid item xs={6} sm={4} md={3} key={i}>
            <Box
              sx={(theme) => ({
                padding: theme.spacing(2, 1),
                background: theme.palette.common.white,
                borderRadius: theme.spacing(2),
                position: "relative",
              })}
            >
              {queryTag === newUsersDashboardTag && (
                <Box
                  sx={(theme) => ({
                    position: "absolute",
                    top: theme.spacing(1),
                    zIndex: 5,
                    left: theme.spacing(0.5),
                  })}
                >
                  <IconButton
                    disableFocusRipple
                    disableRipple
                    sx={(theme) => ({
                      backgroundColor: theme.palette.primary.light,
                      marginLeft: theme.spacing(1),
                      borderRadius: theme.spacing(1),
                      padding: "5px",
                      boxShadow: theme.shadows[3],
                      color: theme.palette.common.white,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                      },
                    })}
                  >
                    <PersonAddIcon />
                  </IconButton>
                </Box>
              )}
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                }}
              >
                <>
                  <Avatar
                    sx={(theme) => ({
                      width: theme.spacing(8),
                      height: theme.spacing(8),
                      margin: "0 auto 20px",
                    })}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    variant="body1"
                    sx={(theme) => ({
                      fontWeight: theme.typography.fontWeightBold,
                      color: theme.palette.common.black,
                      fontSize: ".9rem",
                      textAlign: "center",
                    })}
                  >
                    {user.username}
                  </Typography>
                  {queryTag === newUsersDashboardTag && (
                    <Typography
                      variant="body1"
                      sx={(theme) => ({
                        textAlign: "center",
                        color: theme.palette.common.black,
                        fontWeight: theme.typography.fontWeightMedium,
                        fontSize: ".7rem",
                        marginBottom: "20px",
                      })}
                    >
                      {user.email}
                    </Typography>
                  )}
                  {queryTag === activeUsersDashboardTag && (
                    <Stack
                      direction="row"
                      spacing={2}
                      marginBottom={2}
                      justifyContent="center"
                    >
                      <Typography
                        variant="body1"
                        sx={(theme) => ({
                          fontSize: ".8rem",
                          color: theme.palette.common.black,
                        })}
                      >
                        <ForumIcon
                          sx={(theme) => ({
                            color: theme.palette.secondary.main,
                            fontSize: ".9rem",
                            verticalAlign: "middle",
                            marginRight: "5px",
                          })}
                        />
                        {user.post.topics.length}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={(theme) => ({
                          fontSize: ".8rem",
                          color: theme.palette.common.black,
                        })}
                      >
                        <CommentIcon
                          sx={(theme) => ({
                            color: theme.palette.secondary.main,
                            fontSize: ".9rem",
                            verticalAlign: "middle",
                            marginRight: "5px",
                          })}
                        />
                        {user.post.replies.length}
                      </Typography>
                    </Stack>
                  )}
                  <Typography
                    variant="body1"
                    sx={(theme) => ({
                      color: theme.palette.grey.A200,
                      fontWeight: theme.typography.fontWeightMedium,
                      fontSize: ".7rem",
                      textAlign: "center",
                    })}
                  >
                    {queryTag === activeUsersDashboardTag
                      ? `last activity on ${moment(user.updatedAt).format(
                          "MMM Do YYYY"
                        )}`
                      : `joined on ${moment(user.createdAt).format(
                          "MMM Do YYYY"
                        )}`}
                  </Typography>
                </>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UsersPanelDashboard;
