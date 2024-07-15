import { useEffect, useState } from "react";

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
export interface IMatch {
  isKey: boolean;
  value: string;
}
const MatchCountryCapitals = () => {
  const [countryState, setCountryData] = useState<IMatch[]>([]);
  const [match, setMatch] = useState<IMatch[]>([]);
  const [isFinished, setFinished] = useState(false);
  useEffect(() => {
    showPairs();
  }, []);
  const showPairs = () => {
    let tempData: IMatch[] = [];
    Object.entries(CountryData).map(([key, value]) => {
      tempData.push({ isKey: true, value: key });
      tempData.push({ isKey: false, value });
    });
    tempData.sort(() => Math.random() - 0.5); // order the array randomly

    setCountryData(tempData);
  };

  useEffect(() => {
    if (match.length === 2) {
      const [item1, item2] = match;
      if (item1.isKey !== item2.isKey) {
        for (let [key, value] of Object.entries(CountryData)) {
          if (item1.isKey) {
            if (key === item1.value && value === item2.value) {
              return setFinished(true);
            } else {
              setMatch([]);
              setFinished(false);
            }
          } else {
            if (key === item2.value && value === item1.value) {
              return setFinished(true);
            } else {
              setMatch([]);
              setFinished(false);
            }
          }
        }
      } else {
        setMatch([]);
        setFinished(false);
        return;
      }
    }
  }, [match]);

  const handleClick = (value: IMatch) => {
    if (match.length <= 1) {
      setMatch((prev) => [...prev, value]);
    }
  };

  return (
    <div className="container">
      <h1 className="text-xl font-bold">Country capitals match game</h1>
      <p className="text-sm">Find the country name and its capital to win.</p>
      {!isFinished ? (
        countryState.map((value) => {
          return (
            <div
              key={value.value}
              onClick={() => handleClick(value)}
              className={`border rounded-md p-1 m-1 
              inline-block hover:bg-slate-300 cursor-pointer ${
                match.includes(value) ? "bg-slate-500 text-white" : null
              }`}
            >
              {value.value}
            </div>
          );
        })
      ) : (
        <div>You found the match</div>
      )}
    </div>
  );
};

export default MatchCountryCapitals;
