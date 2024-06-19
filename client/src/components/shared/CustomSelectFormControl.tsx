import React from "react"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"

interface CustomSelectFormControlProps {
  label: string
  name: string
  defaultValue: string
  options: Array<{ value: string; label: string }>
}

const CustomSelectFormControl: React.FC<CustomSelectFormControlProps> = ({
  label,
  name,
  defaultValue,
  options,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select defaultValue={defaultValue} name={name}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CustomSelectFormControl
