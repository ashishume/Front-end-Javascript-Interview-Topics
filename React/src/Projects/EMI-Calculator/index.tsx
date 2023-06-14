/**
 * 
 Loan Calculator
This EMI calculator shall display the loan EMls on a car or home loan with a down Payment ( if any ).
This can be used while Investing, Insurance, House, Car, or anything.
For example, you want to buy a house for Rs 50,00,000. You would make a down payment
of 20% or Rs 50.00.000 * 0.2 = Rs 10.00.000.
The bank would sanction the home loan of Rs 40,00,000. You have processing fees of 1% of the loan amount or Rs 40,00,000 • 0.01 = Rs 40,000.
The total amount you need for the down payment is Rs 10,00,000 + Rs 40,000 = Rs
10.40.000.
Total down payment = Rs 10.4 lakh.
EMI amount = [P x R x (1+R)^N]/[(1+R)^N- 1] where P, R, and N are the variables.
This also means that the EMI value will change every time you change any of the three variables.
'P' stands for the Principal Amount. It is the original loan amount given to you by the bank on which the interest will be calculated.
'R' stands for the Rate of Interest set by the bank.
'N' is the Number of Years given to you for loan repayment.

 */

import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import RangeSlider from "./components/Slider";
import "./style.scss";
import { addCommas, markActive } from "./Utils/HelperMethods";
const EMICalculator = () => {
  const [totalAssetsCost, setTotalAssetsCost] = useState(800000);
  const [interestRate, setInterestRate] = useState(8.65);
  const [processingFee, setProcessingFee] = useState(1);
  const [loanEMI, setLoanEMI] = useState(0);
  const [downpayment, setDownpayment] = useState(0.2 * totalAssetsCost);
  const [totalDownpaymentPayable, setTotalDownpaymentPayable] = useState(0);
  const [bankLoan, setBankLoan] = useState(totalAssetsCost - downpayment);
  const [activeYear, setActiveYear] = useState(12);
  const [tenureYears, setTenueYears] = useState([
    {
      isActive: true, //default selected
      value: 12,
    },
    {
      isActive: false,
      value: 24,
    },
    {
      isActive: false,
      value: 36,
    },
    {
      isActive: false,
      value: 48,
    },
    {
      isActive: false,
      value: 60,
    },
  ]);
  const calculateMonthlyEMI = () => {
    const r = interestRate / 1200; // Convert annual interest rate to monthly rate
    const numerator = bankLoan * r * Math.pow(1 + r, activeYear);
    const denominator = Math.pow(1 + r, activeYear) - 1;
    setLoanEMI(numerator / denominator);
  };

  const calculateBankLoanAmount = async (downpaymentValue: number) => {
    console.log("1", downpaymentValue);
    await setDownpayment(downpaymentValue);

    const total =
      downpaymentValue +
      (processingFee / 100) * (totalAssetsCost - downpaymentValue);
    await setTotalDownpaymentPayable(total);
    console.log("2", total);

    await calculateMonthlyEMI();
  };

  useEffect(() => {
    calculateBankLoanAmount(downpayment);
  }, [totalAssetsCost]);

  return (
    <>
      <div className="range-container">
        <Form.Control
          placeholder="Total assets value"
          type="number"
          className="totalAssets"
          min={0}
          value={totalAssetsCost}
          onChange={(e) => setTotalAssetsCost(e.target.value as any)}
          aria-describedby="basic-addon1"
        />
        <RangeSlider
          value={downpayment}
          onChangeHandler={(e) => calculateBankLoanAmount(e.target.value)}
          prefix="₹"
          min={0}
          step={1}
          max={totalAssetsCost}
          label="Total down payment (in ₹)"
        />

        <div>
          Total downpayment payable: {addCommas(totalDownpaymentPayable)}
        </div>
        <RangeSlider
          value={interestRate}
          min={0}
          suffix="%"
          step={1}
          onChangeHandler={(e) => setInterestRate(e.target.value)}
          max={30}
          label="Interest rate (in %)"
        />
        <RangeSlider
          value={processingFee}
          min={0}
          suffix="%"
          onChangeHandler={(e) => setProcessingFee(e.target.value)}
          max={100}
          label="Processing fee (in %)"
        />

        <div className="year-container">
          {tenureYears.map((value) => {
            return (
              <div
                key={value.value}
                onClick={() =>
                  markActive(value, tenureYears, setTenueYears, setActiveYear)
                }
                className={value.isActive ? "year-text-active" : "year-text"}
              >
                {value.value}
              </div>
            );
          })}
        </div>

        <div className="loan-amount">EMI per month: ₹ {loanEMI}</div>
        <div className="loan-amount">
          loan from bank: ₹ {addCommas(bankLoan)}
        </div>
      </div>
    </>
  );
};

export default EMICalculator;
