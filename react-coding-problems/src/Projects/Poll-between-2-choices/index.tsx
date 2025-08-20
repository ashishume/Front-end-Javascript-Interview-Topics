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

  const calculateVoteMessage = (poll: any) => {
    const [vote1, vote2] = poll.options;
    let message = "";
    const diff = vote1.votes - vote2.votes;

    /** winner has not been announced yet */
    if (winner === null || !winner) {
      /** make sure both are not in initial state */
      if (vote1.votes !== 0 || vote2.votes !== 0) {
        /** if both are on same votes its a tie */
        if (vote1.votes !== vote2.votes) {
          message = `${
            diff > 0 ? vote1.text : vote2.text
          } leading by ${Math.abs(diff)}`;
        } else {
          message = "It's a tie";
        }
      }
    } else if (winner) {
      /** winner has been announced  */
      if (vote1.votes === vote2.votes) {
        message = "It's a tie";
      } else {
        message = `${diff > 0 ? vote1.text : vote2.text} won by ${Math.abs(
          diff
        )} vote(s)`;
      }
    }
    return message;
  };

  const handleWinner = (isWinner: boolean) => {
    setWinner(isWinner);
    setPollData(initialData);
  };

  return (
    <div className="container">
      <div className="text-center">{pollData.question}</div>
      <PollCard
        calculateVoteMessage={calculateVoteMessage}
        poll={pollData}
        viewWinner={winner}
        onVote={onVote}
        setWinner={handleWinner}
      />
    </div>
  );
};

export default PollManager;
