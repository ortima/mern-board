import { Theme } from "@mui/material";

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
