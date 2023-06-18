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

import { ChangeEvent, useEffect, useState } from "react";
import "./style.scss";

const EMICalculator = () => {
  const [cost, setCost] = useState<number>(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downpayment, setDownpayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const updateEMI = (e: ChangeEvent): void => {
    console.log(e);
  };
  const updateDownpayment = (e: ChangeEvent): void => {
    console.log(e);
  };
  const calculateEMI = (e: number): number => {
    return 0;
  };
  return (
    <>
      <div className="container">
        <h3>EMI Calculator</h3>
        <div className="title">Total cost of Asset</div>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(parseInt(e.target.value))}
        />
        <div className="title">Interest rate(in %)</div>
        <input
          type="number"
          value={interest}
          onChange={(e) => setInterest(parseInt(e.target.value))}
        />
        <div className="title">Processing Fee (in %)</div>
        <input
          type="number"
          value={fee}
          onChange={(e) => setFee(parseInt(e.target.value))}
        />
        <div className="title">Down payment</div>
        <input
          type="range"
          min={0}
          max={cost}
          value={downpayment}
          onChange={updateEMI}
        />
        <div className="title">Loan per month</div>
        <div>
          <label>{calculateEMI(cost)}</label>
          <label>{downpayment}</label>
          <label>{calculateEMI(0)}</label>
        </div>
        <input
          type="range"
          value={emi}
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          onChange={updateDownpayment}
        /> 
        <div className="title">Tenure</div>
      </div>
    </>
  );
};
export default EMICalculator;
