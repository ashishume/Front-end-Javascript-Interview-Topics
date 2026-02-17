import { Button } from "@mui/material";
import { PollData } from ".";

interface PollCardProps {
  poll: PollData;
  viewWinner: boolean | null;
  setWinner: (isWon: boolean) => void;
  onVote: (id: number) => void;
  calculateVoteMessage: (poll: any) => string;
}

const PollCard: React.FC<PollCardProps> = ({
  poll,
  viewWinner,
  setWinner,
  onVote,
  calculateVoteMessage,
}) => {
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
      <p className="text-center mt-5">{calculateVoteMessage(poll)}</p>

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
