import { format } from "date-fns";
import { Transaction } from "../store/transactionSlice";

interface TransformEntities {
  [key: string]: string;
}

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
