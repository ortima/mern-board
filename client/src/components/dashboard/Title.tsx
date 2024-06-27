import { Typography } from "@mui/material";
import { TitleProps } from "../../@types/componentsInterfaces";

export const Title = (props: TitleProps) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
};
