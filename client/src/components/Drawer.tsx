import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Toolbar, Divider, IconButton, List, Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { mainListItems } from "./dashboard/ListItems";
import { themeAnimationEntering, themeAnimationLeaving } from "../constants";

interface DrawerProps {
  open: boolean;
  toggleDrawer: () => void;
}

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
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

const DrawerComponent: React.FC<DrawerProps> = ({ open, toggleDrawer }) => (
  <Drawer variant="permanent" open={open}>
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: [1],
      }}
    >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeft />
      </IconButton>
    </Toolbar>
    <Divider />
    <List component="nav">
      {mainListItems}
      <Divider sx={{ my: 1 }} />
    </List>
    <Button>
      <a href="/template.ods" download>
        Скачать шаблон
      </a>
    </Button>
  </Drawer>
);

export default DrawerComponent;
