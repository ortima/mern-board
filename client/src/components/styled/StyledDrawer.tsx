import {
  drawerWidth,
  themeAnimationEntering,
  themeAnimationLeaving,
} from "../../constants";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

export const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create(
      "width",
      themeAnimationEntering(theme),
    ),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create(
        "width",
        themeAnimationLeaving(theme),
      ),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
