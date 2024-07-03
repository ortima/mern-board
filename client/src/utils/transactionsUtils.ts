import { format } from "date-fns";
import { Transaction } from "../@types/stateInterfaces";
import { TransformEntities } from "../@types/utilsInterfaces";

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "yyyy-MM-dd");
};

export const transformTransactionType = (type: string) => {
  const types: TransformEntities = {
    income: "Доходы",
    expense: "Расходы",
  };

  return types[type] || type;
};

export const transformCategory = (category: string) => {
  const categories: TransformEntities = {
    school: "Школа",
    work: "Работа",
    university: "Университет",
  };

  return categories[category] || category;
};

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(amount);
};

export const formatTransaction = (transaction: Transaction) => ({
  ...transaction,
  createdAt: formatDate(transaction.createdAt),
  type: transformTransactionType(transaction.type),
  category: transformCategory(transaction.category),
  amount: formatAmount(transaction.amount),
});

export const getAuthToken = () => {
  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    return userData.token;
  }
  return null;
};
