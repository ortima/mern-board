import { SelectChangeEvent } from "@mui/material";
import { AppBarProps as MuiAppBarProps } from "@mui/material";

//Title.tsx
export interface TitleProps {
  children?: React.ReactNode;
}

//ListItems.tsx
export interface RoutesProps {
  id: number;
  url: string;
  text: string;
  icon: React.ReactNode;
}

//AddFileModal.tsx
export interface AddFileModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

//AddModal.tsx
export interface FormElements extends HTMLFormControlsCollection {
  type: HTMLSelectElement | HTMLInputElement | any;
  category: HTMLSelectElement;
  description: HTMLInputElement;
  amount: HTMLInputElement;
}

export interface Form extends HTMLFormElement {
  readonly elements: FormElements;
}

//CustomAlert.tsx
export interface CustomAlertProps {
  open: boolean;
  severity: "error" | "warning" | "info" | "success";
  message: string;
  onClose?: () => void;
}

//CustomSelectFormControl
export interface CustomSelectFormControlProps {
  label: string;
  name: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange?: (e: SelectChangeEvent<string>, child: React.ReactNode) => void;
}

//SidebarProps
export interface SidebarProps {
  open: boolean;
  toggleDrawer: () => void;
}

//Appbar
export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  toggleDrawer?: () => void;
}

//TransactionModalProps
export interface TransactionModalProps {
  isEdit: boolean;
}

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  toggleDrawer?: () => void;
}
