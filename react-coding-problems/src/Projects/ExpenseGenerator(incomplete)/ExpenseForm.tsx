import { Button } from "@mui/material";
import { useState } from "react";
import { IExpenses } from ".";

const ExpenseForm = ({ onSubmit }: any) => {
  const [formData, setFormData] = useState<IExpenses>({
    type: "income",
    value: 0,
    description: "",
    id: (Math.floor(Math.random() * 1000000) + 1),
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    let value = formData.value;
    if (formData.type === "expense") {
      value = -formData.value;
    }
    await onSubmit({
      ...formData,
      ...{
        value,
      },
    });

    //reset form
    await setFormData({
      type: "income",
      value: 0,
      description: "",
      id: Math.floor(Math.random() * 1000000) + 1,
    });
  };

  return (
    <div>
      <select
        className="p-1 rounded mr-1"
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="income">+</option>
        <option value="expense">-</option>
      </select>
      <input
        className="p-1 rounded mr-1"
        onChange={handleChange}
        name="description"
        type="text"
        value={formData.description}
        placeholder="Enter Description"
      />
      <input
        className="p-1 rounded"
        name="value"
        onChange={handleChange}
        type="number"
        placeholder="Enter Value"
        value={formData.value}
      />
      <Button className="ml-1" onClick={handleSubmit}>
        Add
      </Button>
    </div>
  );
};

export default ExpenseForm;
