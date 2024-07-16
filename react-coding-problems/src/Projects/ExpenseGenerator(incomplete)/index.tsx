import { useState } from "react";
import Transactions from "./Transactions";
import ExpenseForm from "./ExpenseForm";

export interface IExpenses {
  id: number;
  type: "income" | "expense";
  value: number;
  description: string;
}

const transactions: IExpenses[] = [
  {
    id: 1,
    value: 1000,
    type: "income",
    description: "Salary",
  },
  {
    id: 2,
    value: 1000,
    type: "income",
    description: "Stocks",
  },
  {
    id: 3,
    value: -500,
    type: "expense",
    description: "Laptop",
  },
  {
    id: 4,
    value: -500,
    type: "expense",
    description: "Games",
  },
];

export const sum = (array: number[]) => {
  return 0;
};

const ExpenseGenerator = () => {
  const [monthlyTransactions, setMonthlyTransactions] =
    useState<IExpenses[]>(transactions);

  const onDeleteItem = (id: number) => {
    setMonthlyTransactions(monthlyTransactions.filter((v) => v.id !== id));
  };

  // const onAddItem = (id: number) => {};

  // const incomeList = transactions.filter((v) => v.type === "income");
  // const expenseList = transactions.filter((v) => v.type === "expense");

  // const income = sum(incomeList.map((v) => v.value));
  // const expense = sum(expenseList.map((v) => v.value));

  const onSubmit = (e: IExpenses) => {
    console.log(e);
    
    setMonthlyTransactions(monthlyTransactions.concat(e));
  };

  console.log(monthlyTransactions);

  return (
    <div className="container">
      <h1>Expense generator</h1>
      {/* <ExpenseDisplay income={income} expense={expense} /> */}
      <ExpenseForm onSubmit={onSubmit} />
      <Transactions transactionsList={monthlyTransactions} onDeleteItem={onDeleteItem} />
    </div>
  );
};

export default ExpenseGenerator;
