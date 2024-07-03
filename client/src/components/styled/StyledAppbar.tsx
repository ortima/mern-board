import {
  drawerWidth,
  themeAnimationEntering,
  themeAnimationLeaving,
} from "../../constants";
import { styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { AppBarProps } from "../../@types/componentsInterfaces";

export const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(
    ["width", "margin"],
    themeAnimationLeaving(theme),
  ),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(
      ["width", "margin"],
      themeAnimationEntering(theme),
    ),
  }),
}));
