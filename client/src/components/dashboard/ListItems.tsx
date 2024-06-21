import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, PieChart } from "@mui/icons-material";

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <Dashboard />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PieChart />
      </ListItemIcon>
      <ListItemText primary="Charts" />
    </ListItemButton>
  </>
);
