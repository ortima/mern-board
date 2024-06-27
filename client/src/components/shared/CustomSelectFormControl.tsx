import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CustomSelectFormControlProps } from "../../@types/componentsInterfaces";

export const CustomSelectFormControl: React.FC<
  CustomSelectFormControlProps
> = ({ label, name, defaultValue, options, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>

      <Select defaultValue={defaultValue} name={name} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
