import { format } from "date-fns";
import { Transaction } from "../store/transactionSlice";

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "yyyy-MM-dd");
};

export const transformTransactionType = (type: string) => {
  switch (type) {
    case "income":
      return "Доходы";
    case "expense":
      return "Расходы";
    default:
      return type;
  }
};

export const transformCategory = (category: string) => {
  switch (category) {
    case "school":
      return "Школа";
    case "work":
      return "Работа";
    case "university":
      return "Университет";
    default:
      return category;
  }
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
