import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, PieChart } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface RoutesProps {
  id: number;
  url: string;
  text: string;
  icon: React.ReactNode;
}

const routes: RoutesProps[] = [
  {
    id: 1,
    url: "/dashboard",
    text: "Dashboard",
    icon: <Dashboard />,
  },
  {
    id: 2,
    url: "/charts",
    text: "Charts",
    icon: <PieChart />,
  },
];

export const mainListItems = (
  <>
    {routes.map((route) => (
      <ListItemButton key={route.id} component={Link} to={route.url}>
        <ListItemIcon>{route.icon}</ListItemIcon>
        <ListItemText primary={route.text} />
      </ListItemButton>
    ))}
  </>
);
