import { useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import LandingPageImage from "../../asset/backgroundlanding-bg.jpg";

export default function App() {
  return (
    <Box
      sx={{
        background: `url(${LandingPageImage})`,
        backgroundSize: "cover",
        width: "100%",
      }}
    >
      <Toolbar />

      <Stack
        direction={"column"}
        justifyContent="center"
        alignItems="flex-end"
        sx={{
          paddingTop: 12,
          paddingBottom: 25,
        }}
      >
        <Box
          width={{ xs: "100%", md: "50%" }}
          textAlign="right"
          marginBottom={2}
        >
          <Typography
            variant="body1"
            fontSize="1.8rem"
            fontWeight={700}
            color="primary.light"
            marginBottom={2}
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit
          </Typography>
          <Typography variant="body1" fontSize={".85rem"} color="#fff">
            Mauris quis justo dui. Phasellus posuere porta ante. Phasellus eu
            pretium justo. In gravida, tortor in semper consectetur, nulla elit
            tempor arcu, non accumsan nisi dui convallis mi. Pellentesque vitae
            lacus posuere, vestibulum metus sed, aliquam sapien. Maecenas et
            feugiat eros. Pellentesque sed fermentum sapien, eu sagittis arcu.
            Morbi vestibulum massa quis cursus viverra. In id massa nec metus
            molestie luctus vel eu libero. Quisque non leo id nisl efficitur
            ullamcorper sit amet pretium tellus.
          </Typography>
        </Box>
        <Button variant="pill-primary">Learn More..</Button>
      </Stack>
    </Box>
  );
}
