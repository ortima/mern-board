import { Theme } from "@mui/material";
import { NewTransaction } from "../@types/stateInterfaces";

export const themeAnimationLeaving = (theme: Theme) => ({
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.leavingScreen,
});

export const themeAnimationEntering = (theme: Theme) => ({
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.enteringScreen,
});

export const categoryOptions = [
  { value: "school", label: "Школа" },
  { value: "work", label: "Работа" },
  { value: "university", label: "Университет" },
];

export const typeOptions = [
  { value: "expense", label: "Расходы" },
  { value: "income", label: "Доходы" },
];

export const drawerWidth = 240;

export const COLUMNS = [
  { name: "createdAt", title: "Дата" },
  { name: "type", title: "Тип" },
  { name: "category", title: "Категория" },
  { name: "description", title: "Описание" },
  { name: "amount", title: "Сумма" },
];

export const initialTransactionState: NewTransaction = {
  type: "",
  category: "",
  description: "",
  amount: null,
};

export const signUpFields = [
  {
    name: "name" as const,
    label: "First Name",
    id: "name",
    type: "text",
  },
  {
    name: "secondName" as const,
    label: "Second Name",
    id: "secondName",
    type: "text",
  },
  {
    name: "email" as const,
    label: "Email",
    id: "email",
    type: "text",
  },
  {
    name: "password" as const,
    label: "Password",
    id: "password",
    type: "password",
  },
  {
    name: "passwordConfirm" as const,
    label: "Confirm Password",
    id: "passwordConfirm",
    type: "password",
  },
];

export const signInFields = [
  {
    name: "email" as const,
    label: "Email",
    id: "email",
    type: "text",
  },
  {
    name: "password" as const,
    label: "Password",
    id: "password",
    type: "password",
  },
];
