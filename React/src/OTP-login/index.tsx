import React, { useState } from "react";
import EnterOtp from "./components/enter-otp";
import EnterPhone from "./components/enter-phone";

const Phone = () => {
  const [phoneData, setPhone] = useState<number | null>(0);
  const [otpData, setOtpData] = useState<number | null>(0);
  function onSubmitPhone(e: number | null) {
    setPhone(e);
  }
  function submitFinalOtp(e: number | null) {
    window.alert('form submitted')
    setOtpData(e);
  }
  return (
    <>
      {!phoneData && <EnterPhone submitPhone={onSubmitPhone} />}
      {phoneData ? (
        <EnterOtp submitFinalOtp={submitFinalOtp} length={4} />
      ) : null}
    </>
  );
};

export default Phone;
