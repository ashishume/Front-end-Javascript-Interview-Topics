import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import DataDisplay from "./components/data-display";
import Input from "./components/input";
import Layout from "./pages/Layout/Layout";
import { addProducts } from "./store/actions/actionItems";

const App = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };
  const onSubmitData = () => {
    dispatch(addProducts(task));
  };

  return (
    <Layout>
      <div className="task-editor-container">
        <Input onInputChange={onInputChange} />
        <Button onClick={onSubmitData}>Add</Button>
      </div>

      <DataDisplay value={""} />
    </Layout>
  );
};

export default App;
