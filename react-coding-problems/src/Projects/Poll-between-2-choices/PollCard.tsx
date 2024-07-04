import { Button } from "@mui/material";
import { PollData } from ".";

interface PollCardProps {
  poll: PollData;
  viewWinner: boolean | null;
  setWinner: (isWon: boolean) => void;
  onVote: (id: number) => void;
}

const PollCard: React.FC<PollCardProps> = ({
  poll,
  viewWinner,
  setWinner,
  onVote,
}) => {
  const calculateVoteMessage = () => {
    const [vote1, vote2] = poll.options;
    let message = "";
    const diff = vote1.votes - vote2.votes;

    /** winner has not been announced yet */
    if (viewWinner === null || viewWinner === false) {
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
    } else if (viewWinner === true) {
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

  return (
    <div>
      <div className="flex flex-row justify-center items-center">
        {poll.options.map(({ id, text }: any) => (
          <div
            key={id}
            className="border rounded shadow-lg border-1 m-1 p-2 h-60 w-60 flex flex-col justify-between text-center"
          >
            <div className="text-4xl">{text}</div>
            <Button
              variant="outlined"
              size="small"
              disabled={viewWinner === true}
              onClick={() => onVote(id)}
            >
              Vote
            </Button>
          </div>
        ))}
      </div>
      <p className="text-center mt-5">{calculateVoteMessage()}</p>

      <div className="text-center">
        <Button
          onClick={() => setWinner(true)}
          color="primary"
          variant="outlined"
          disabled={viewWinner === true}
        >
          View Winner
        </Button>
      </div>
    </div>
  );
};

export default PollCard;
