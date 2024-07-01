import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, PieChart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { RoutesProps } from "../../@types/componentsInterfaces";

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

export const ListItems = () => {
  return (
    <>
      {routes.map((route) => (
        <ListItemButton key={route.id} component={Link} to={route.url}>
          <ListItemIcon>{route.icon}</ListItemIcon>
          <ListItemText primary={route.text} />
        </ListItemButton>
      ))}
    </>
  );
};
