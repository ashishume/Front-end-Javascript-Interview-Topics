import { useState } from "react";
import PollCard from "./PollCard";

export interface PollData {
  question: string;
  options: {
    id: number;
    text: string;
    votes: number;
  }[];
}

const initialData: PollData = {
  question: "Who will win?",
  options: [
    { id: 1, text: "Superman", votes: 0 },
    { id: 2, text: "Batman", votes: 0 },
  ],
};

const PollManager = () => {
  const [pollData, setPollData] = useState<PollData>(initialData);
  const [winner, setWinner] = useState<boolean | null>(null);

  const onVote = (id: number) => {
    setWinner(false);
    const options = pollData.options.map((val) => {
      if (val.id === id) {
        val.votes += 1;
      }
      return val;
    });
    setPollData((prevData) => ({
      ...prevData,
      options,
    }));
  };

  const handleWinner = (isWinner: boolean) => {
    setWinner(isWinner);
    setPollData(initialData);
  };

  return (
    <div className="container">
      <div className="text-center">{pollData.question}</div>
      <PollCard
        poll={pollData}
        viewWinner={winner}
        onVote={onVote}
        setWinner={handleWinner}
      />
    </div>
  );
};

export default PollManager;
