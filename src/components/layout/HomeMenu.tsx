import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ListItem,
  List,
  Box,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const navItems: string[] = [
  "Forum",
  "Events",
  "Announcements",
  "About",
  "Contact",
];
const drawerWidth: number = 240;

export function DrawerList({
  handleDrawerToggle,
}: {
  handleDrawerToggle: () => void;
}) {
  const { menuItem } = useParams();

  return (
    <Box onClick={handleDrawerToggle} paddingTop={5}>
      <List>
        {navItems.map((item, i) => (
          <React.Fragment key={i}>
            <ListItem>
              <Link to={`/${item.toLowerCase()}`}>
                <ListItemText
                  primary={item}
                  disableTypography
                  sx={{
                    color:
                      menuItem === item.toLowerCase()
                        ? "primary.light"
                        : "#fff",
                    fontSize: ".8rem",
                    fontWeight: 600,
                    paddingX: 2,
                    paddingY: "5px",
                    "&:hover": {
                      color: "primary.light",
                    },
                  }}
                />
              </Link>
            </ListItem>
            <Divider variant="middle" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default function HomeMenu({ children }: { children: React.ReactNode }) {
  const { menuItem } = useParams();
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  function toggleMobileMenu(): void {
    setMobileMenu((prev) => !prev);
  }

  return (
    <Box>
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
            sx={{ flexGrow: 1, color: "primary.main", textAlign: "left" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Logo
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, i) => (
              <Link
                to={`/${item.toLowerCase()}`}
                key={i}
                style={{ textDecoration: "none" }}
              >
                <Button
                  sx={{
                    color:
                      menuItem === item.toLowerCase()
                        ? "primary.light"
                        : "#fff",
                    marginX: 2,
                    textTransform: "unset",
                    "&:hover": {
                      background: "transparent",
                      color: "primary.light",
                    },
                  }}
                  disableRipple={true}
                >
                  {item}
                </Button>
              </Link>
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleMobileMenu}
            sx={{
              display: { sm: "none" },
              "&:hover": {
                background: "transparent",
              },
            }}
            size="large"
          >
            <MenuIcon
              fontSize={"large"}
              sx={{
                color: "#fff",
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileMenu}
          onClose={toggleMobileMenu}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "primary.main",
            },
          }}
        >
          <DrawerList handleDrawerToggle={toggleMobileMenu} />
        </Drawer>
      </Box>
      <Box component="main" style={{ width: "100%" }}>
        {children}
      </Box>
    </Box>
  );
}
