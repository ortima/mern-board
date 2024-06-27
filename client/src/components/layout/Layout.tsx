import { useState } from "react";
import {
  CssBaseline,
  Box,
  ThemeProvider,
  createTheme,
  Toolbar,
} from "@mui/material";
import { AppBarComponent, Sidebar } from ".";
import { CustomAlert } from "../shared";

const defaultTheme = createTheme();

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBarComponent open={open} toggleDrawer={toggleDrawer} />

        <Sidebar open={open} toggleDrawer={toggleDrawer} />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          {children}
        </Box>
        <CustomAlert />
      </Box>
    </ThemeProvider>
  );
};
