import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const DynamicForm = () => {
  const [formData, setFormData] = useState({
    name1: "",
  } as any);

  const [inputs, setInputs] = useState(1);

  function addNewInputField() {
    setInputs((prev) => prev + 1);
    setFormData((prev: any) => ({
      ...prev,
      [`name${inputs + 1}`]: "",
    }));
  }

  function changeInputValue(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }
  function submitForm(e: any) {
    e.preventDefault();
    console.log(formData);
  }
  return (
    <div>
      <Button
        style={{
          margin: "10px",
        }}
        onClick={addNewInputField}
      >
        Add New Input Field
      </Button>
      <form onSubmit={submitForm}>
        {Array.from({ length: inputs }, (_, index) => index + 1).map(
          (index) => {
            const inputName = `name${index}`;
            return (
              <input
                type="text"
                key={index}
                name={inputName}
                value={formData[inputName] || ""}
                onChange={changeInputValue}
                placeholder={`Enter for ${inputName}...`}
              />
            );
          }
        )}
        <div
          style={{
            margin: "10px",
          }}
        >
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
