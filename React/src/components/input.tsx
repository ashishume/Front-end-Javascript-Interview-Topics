import React from "react";
import { Button, Form } from "react-bootstrap";

interface InputProps {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = ({ onInputChange }: InputProps) => {
  return (
    <>
      <Form.Control type="text" id="typeText" placeholder="Add task..." aria-describedby="passwordHelpBlock" onChange={onInputChange} />
    </>
  );
};

export default Input;
