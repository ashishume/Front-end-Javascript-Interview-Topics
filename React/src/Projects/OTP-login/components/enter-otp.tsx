import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { Button } from "react-bootstrap";

const EnterOtp = ({
  length = 4,
  submitFinalOtp,
}: {
  length: number;
  submitFinalOtp: (otp: number) => void;
}) => {
  const [otpArr, setOtp] = useState(new Array(length).fill(""));
  const ref = useRef<any>([]);

  useEffect(() => {
    if (ref.current[0]) {
      (ref.current[0] as any).focus();
    }
  }, []);
  function onChangeOtp(value: number, index: number) {
    let tempOtpArray = [...otpArr];
    tempOtpArray[index] = value;
    /** check if 1 otp field is entered, if done the shift the focus to next field */
    if (!isNaN(value) && value && tempOtpArray[index] && index < length - 1) {
      ref.current[index + 1].focus();
    }
    const combinedOTP = tempOtpArray.join("");
    if (combinedOTP.length === length) {
        submitFinalOtp(parseInt(combinedOTP));
    }
    setOtp(tempOtpArray);
  }

  function onKeyDownHandler(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      ref.current[index - 1] &&
      !otpArr[index]
    ) {
      ref.current[index - 1].focus();
    }
  }
  return (
    <div className="otp-container">
      <div>
        <h1>Enter OTP</h1>
      </div>
      <div className="otp-container--content">
        {otpArr.map((value, index) => {
          return (
            <div className="otp-field" key={index}>
              <input
                type="text"
                value={value}
                maxLength={1}
                ref={(input) => (ref.current[index] = input)}
                onKeyDown={(e) => onKeyDownHandler(e, index)}
                onChange={(e) => onChangeOtp(e.target.value as any, index)}
              />
            </div>
          );
        })}
      </div>
      {/* <Button
        variant="outline-primary"
        size="sm"
        className="otp-btn"
        onClick={submitOTP}
      >
        Submit OTP
      </Button> */}
    </div>
  );
};

export default EnterOtp;
