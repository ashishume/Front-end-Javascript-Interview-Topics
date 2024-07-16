import { IExpenses } from ".";

const Transactions = ({
  transactionsList,
  onDeleteItem,
}: {
  transactionsList: IExpenses[];
  onDeleteItem: (id: number) => void;
}) => {
  return (
    <div>
      <div className="text-md"></div>
      {transactionsList.map((value) => {
        return (
          <div
            className="flex flex-row justify-between border border-1 m-1 p-2 rounded-sm hover:bg-slate-300"
            key={value.id}
          >
            <div className="flex-1">₹{value.value}</div>
            <div className="flex-1">{value.description}</div>
            <button onClick={() => onDeleteItem(value.id)}>Remove</button>
          </div>
        );
      })}
    </div>
  );
};

export default Transactions;
