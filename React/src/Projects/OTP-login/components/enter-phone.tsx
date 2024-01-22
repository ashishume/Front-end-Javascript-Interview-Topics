import React, { ChangeEvent, useEffect, useState } from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
const EnterPhone = ({
  submitPhone,
}: {
  submitPhone: (phoneNumber: number | null) => void;
}) => {
  const [phoneData, setPhone] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  function changePhoneNumber(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const value = e.target.value;
      const regex = /[^0-9]/g;

      if (value?.length >= 10 || regex.test(value)) {
        setError("");
        setPhone(e.target.value as any);
      } else {
        setError("Invalid phone no.");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="phone-container">
      <input
        type="number"
        placeholder="Enter phone no."
        onChange={changePhoneNumber}
      />
      <Button
        onClick={() => submitPhone(phoneData)}
        size="sm"
        variant="outline-primary"
      >
        Submit
      </Button>
      <div>{error}</div>
    </div>
  );
};

export default EnterPhone;
