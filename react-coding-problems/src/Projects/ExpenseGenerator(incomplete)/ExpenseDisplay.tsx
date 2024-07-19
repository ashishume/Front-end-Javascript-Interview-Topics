const ExpenseDisplay = ({
  income,
  expense,
}: {
  income: number;
  expense: number;
}) => {
  return (
    <div>
      <h1>Expenses: - ₹{Math.abs(expense)}</h1>
      <h1>Income: ₹{income}</h1>
    </div>
  );
};

export default ExpenseDisplay;
