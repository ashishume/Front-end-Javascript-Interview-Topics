import { useState } from "react";

const CountryData = {
  India: "New Delhi",
  Russia: "Moscow",
  China: "Beijing",
  USA: "Washington, D.C.",
  Japan: "Tokyo",
  Germany: "Berlin",
  France: "Paris",
  Brazil: "Brasília",
  Canada: "Ottawa",
  Australia: "Canberra",
  Italy: "Rome",
  "South Korea": "Seoul",
  "United Kingdom": "London",
  Mexico: "Mexico City",
  "South Africa": "Pretoria",
  Argentina: "Buenos Aires",
  "Saudi Arabia": "Riyadh",
  Turkey: "Ankara",
  Spain: "Madrid",
  Indonesia: "Jakarta",
};

const MatchCountryCapitals = () => {
  const [countryData, setCountryData] = useState([]);


  const showPairs = () => {

  };
  return (
    <div>
      <h1>Country capitals match game</h1>
      {/* <div>{showPairs()}</div> */}
    </div>
  );
};

export default MatchCountryCapitals;
