import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import SearchIcon from "@mui/icons-material/Search";
import CategoriesMenu from "../common/menu/CategoriesMenu";

// components

const drawerWidth: number = 320;

export default function ForumMenu({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        color="transparent"
        sx={{
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Typography
            variant="body1"
            fontSize={"1.6rem"}
            fontWeight={900}
            textTransform="uppercase"
            component="div"
            sx={{ flexGrow: 1, color: "primary.main" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Logo
            </Link>{" "}
            |{" "}
            <Link
              to="/forum"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              The Forum
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          anchor="left"
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "transparent",
              border: "none",
              paddingX: 1,
            },
          }}
        >
          <Toolbar />
          <Box
            padding={2}
            borderRadius="10px"
            sx={{
              backgroundColor: "primary.main",
            }}
          >
            <TextField
              type="text"
              name="search"
              placeholder="Search"
              fullWidth
              sx={(theme) => ({
                fontSize: ".75rem",
                fontWeight: 500,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "5px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: theme.spacing(1.2, 2, 1.2, 0),
                },
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <Divider
              sx={{
                marginY: 2,
                bgcolor: "#ccc",
              }}
            />
            <CategoriesMenu />
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}
