import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";

//моковые данные для user admin
const transactions = [
  {
    transactionId: uuidv4(),
    userId: new Types.ObjectId("6672890f9c87a4ce571f03c0"),
    type: "income",
    category: "University",
    description: "Тестовые данные",
    amount: 30000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    transactionId: uuidv4(),
    userId: new Types.ObjectId("6672890f9c87a4ce571f03c0"),
    type: "expense",
    category: "Work",
    description: "Тестовые данные",
    amount: 15000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default transactions;
