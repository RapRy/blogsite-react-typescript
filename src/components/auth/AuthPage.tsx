import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
  SignInFormdataType,
  SignUpFormdataType,
} from "../../models/user_model/authModel";

import { useSignInUserMutation } from "../../service/slice/authSlice";

import BgOrange from "../../asset/bg_orange.jpg";
import BgBlue from "../../asset/bg_blue.jpg";
import AuthBg from "../../asset/auth_bg.jpg";
import { SimpleTypographyError } from "../common/ErrorComponents";
import { forumRoute } from "../../routes/routeKeys";

export default function AuthPage() {
  const navigate = useNavigate();
  const [switchForm, setSwitchForm] = useState<Boolean>(false);
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<Boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<SignUpFormdataType>();

  const [signInUser, { isLoading, error, reset, isSuccess }] =
    useSignInUserMutation();
  const loading = isLoading;

  const handleSwitchForm = () => {
    setSwitchForm((prev) => !prev);
    formReset();
    reset();
  };

  const onSubmit: SubmitHandler<SignInFormdataType> = (data) => {
    signInUser({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (isSuccess) navigate(forumRoute);
  }, [isSuccess]);

  return (
    <Stack
      justifyContent={"center"}
      alignItems="center"
      sx={(theme) => ({
        background: `url(${AuthBg})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        paddingX: theme.spacing(4),
      })}
    >
      <Container
        maxWidth="md"
        sx={(theme) => ({
          background: theme.palette.grey.A100,
          boxShadow: theme.shadows[1],
          borderRadius: "20px",
          padding: "0 !important",
          overflow: "hidden",
        })}
      >
        <Grid container direction={{ xs: "column", md: "row" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={(theme) => ({
              background: switchForm ? `url(${BgOrange})` : `url(${BgBlue})`,
              padding: theme.spacing(3, 3, 16),
              textAlign: "center",
              position: "relative",
              sm: {
                padding: theme.spacing(10, 4),
              },
            })}
          >
            <Typography
              variant="h5"
              align="left"
              sx={(theme) => ({
                fontSize: "1rem",
                fontWeight: theme.typography.fontWeightBold,
                color: theme.palette.common.white,
                position: "absolute",
                top: theme.spacing(3),
                left: theme.spacing(3),
              })}
            >
              Simple Blog
            </Typography>
            <Typography
              variant="h2"
              sx={(theme) => ({
                fontSize: "1.8rem",
                fontWeight: theme.typography.fontWeightBold,
                color: theme.palette.common.white,
                padding: theme.spacing(12, 10, 3),
                sm: {
                  padding: theme.spacing(3, 10, 3),
                },
              })}
            >
              Welcome to the Forum
            </Typography>
            <Typography
              variant="body1"
              sx={(theme) => ({
                fontSize: ".8rem",
                fontWeight: theme.typography.fontWeightRegular,
                padding: theme.spacing(0, 2, 4),
                lineHeight: "1.8",
                color: theme.palette.common.white,
              })}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
              rhoncus, convallis integer pulvinar eget nulla viverra quis. Quis
              leo a donec turpis non. Est, purus auctor viverra faucibus at
              nulla auctor eleifend odio.
            </Typography>
            {switchForm ? (
              <Button
                variant="pill-primary"
                sx={(theme) => ({
                  padding: theme.spacing(1, 6),
                })}
                onClick={handleSwitchForm}
              >
                SIGN IN
              </Button>
            ) : (
              <Button
                variant="pill-secondary"
                sx={(theme) => ({
                  padding: theme.spacing(1, 6),
                })}
                onClick={handleSwitchForm}
              >
                SIGN UP
              </Button>
            )}
          </Grid>
          <Grid item xs={12} md={6} sx={{ padding: "50px 50px" }}>
            <Typography
              variant="h4"
              sx={(theme) => ({
                fontSize: "1.5rem",
                textAlign: "center",
                fontWeight: theme.typography.fontWeightBold,
                paddingBottom: theme.spacing(1),
                color: switchForm
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
              })}
            >
              {switchForm ? "Create Account" : "Sign in to Forum"}
            </Typography>
            <Typography
              variant="body1"
              sx={(theme) => ({
                fontSize: ".8rem",
                fontWeight: theme.typography.fontWeightRegular,
                padding: theme.spacing(0, 2, 4),
                lineHeight: "1.8",
                color: theme.palette.common.black,
                textAlign: "center",
              })}
            >
              {switchForm
                ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                : "Lorem ipsum dolor sit amet."}
            </Typography>
            {error && <SimpleTypographyError error={error} />}
            <Backdrop open={loading ? true : false} style={{ zIndex: 5 }}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <div>
              <form>
                <Stack spacing={2}>
                  {switchForm && (
                    <Controller
                      name="username"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "This field is required.",
                        },
                      }}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          type={"text"}
                          // label={"Username"}
                          placeholder="Username"
                          error={errors.username ? true : false}
                          helperText={errors.username?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            width: "100%",
                          }}
                          {...field}
                        />
                      )}
                    />
                  )}
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required.",
                      },
                    }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        type={"text"}
                        // label={"Username"}
                        placeholder="Email address"
                        error={errors.email ? true : false}
                        helperText={errors.email?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AlternateEmailIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          width: "100%",
                        }}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required.",
                      },
                      minLength: {
                        value: 8,
                        message: "Minimum of 8 characters.",
                      },
                    }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        type={showPassword ? "text" : "password"}
                        // label={"Username"}
                        placeholder="Password"
                        error={errors.password ? true : false}
                        helperText={errors.password?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              {showPassword ? (
                                <VisibilityOffIcon
                                  sx={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setShowPassword(false)}
                                />
                              ) : (
                                <VisibilityIcon
                                  onClick={() => setShowPassword(true)}
                                  sx={{
                                    cursor: "pointer",
                                  }}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          width: "100%",
                        }}
                        {...field}
                      />
                    )}
                  />
                  {switchForm && (
                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "This field is required.",
                        },
                        minLength: {
                          value: 8,
                          message: "Minimum of 8 characters.",
                        },
                      }}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          type={showConfirmPassword ? "text" : "password"}
                          // label={"Username"}
                          placeholder="Confirm password"
                          error={errors.confirmPassword ? true : false}
                          helperText={errors.confirmPassword?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                {showConfirmPassword ? (
                                  <VisibilityOffIcon
                                    sx={{
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      setShowConfirmPassword(false)
                                    }
                                  />
                                ) : (
                                  <VisibilityIcon
                                    onClick={() => setShowConfirmPassword(true)}
                                    sx={{
                                      cursor: "pointer",
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            width: "100%",
                          }}
                          {...field}
                        />
                      )}
                    />
                  )}
                  <Box textAlign="center" paddingTop="30px">
                    <Button
                      variant={switchForm ? "pill-secondary" : "pill-primary"}
                      sx={(theme) => ({
                        padding: theme.spacing(1, 6),
                      })}
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                    >
                      {switchForm ? "CREATE" : "LOGIN"}
                    </Button>
                  </Box>
                </Stack>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}
