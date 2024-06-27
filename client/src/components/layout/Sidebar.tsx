import { Toolbar, Divider, IconButton, List } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { mainListItems } from "../dashboard";
import { StyledDrawer } from "../styled";
import { SidebarProps } from "../../@types/componentsInterfaces";

export const Sidebar: React.FC<SidebarProps> = ({ open, toggleDrawer }) => {
  return (
    <StyledDrawer variant="permanent" open={open}>
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
    </StyledDrawer>
  );
};
