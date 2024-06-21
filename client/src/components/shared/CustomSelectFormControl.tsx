import React, { ChangeEvent } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface CustomSelectFormControlProps {
  label: string;
  name: string;
  defaultValue: string;
  options: Array<{ value: string; label: string }>;
  onChange?: (e: SelectChangeEvent<string>, child: React.ReactNode) => void;
}

const CustomSelectFormControl: React.FC<CustomSelectFormControlProps> = ({
  label,
  name,
  defaultValue,
  options,
  onChange,
}) => {
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

export default CustomSelectFormControl;
