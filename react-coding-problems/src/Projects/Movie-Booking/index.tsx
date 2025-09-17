import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const MovieBooking = () => {
  const [seats, setSeats] = useState([
    [
      { isBooked: false, seatNumber: 1, seatType: "premium" },
      { isBooked: false, seatNumber: 2, seatType: "premium" },
      { isBooked: false, seatNumber: 3, seatType: "premium" },
      { isBooked: false, seatNumber: 4, seatType: "premium" },
      { isBooked: false, seatNumber: 5, seatType: "premium" },
      { isBooked: false, seatNumber: 7, seatType: "premium" },
      { isBooked: false, seatNumber: 8, seatType: "premium" },
      { isBooked: false, seatNumber: 9, seatType: "premium" },
      { isBooked: false, seatNumber: 10, seatType: "premium" },
      { isBooked: false, seatNumber: 11, seatType: "premium" },
      { isBooked: false, seatNumber: 12, seatType: "premium" },
      { isBooked: false, seatNumber: 13, seatType: "premium" },
      { isBooked: false, seatNumber: 14, seatType: "premium" },
      { isBooked: false, seatNumber: 15, seatType: "premium" },
      { isBooked: false, seatNumber: 16, seatType: "premium" },
      { isBooked: false, seatNumber: 17, seatType: "premium" },
      { isBooked: false, seatNumber: 18, seatType: "premium" },
      { isBooked: false, seatNumber: 19, seatType: "premium" },
      { isBooked: false, seatNumber: 20, seatType: "premium" },
    ],
    [
      { isBooked: false, seatNumber: 21, seatType: "recliner" },
      { isBooked: false, seatNumber: 22, seatType: "recliner" },
      { isBooked: false, seatNumber: 23, seatType: "recliner" },
      { isBooked: false, seatNumber: 24, seatType: "recliner" },
      { isBooked: false, seatNumber: 25, seatType: "recliner" },
      { isBooked: false, seatNumber: 26, seatType: "recliner" },
      { isBooked: false, seatNumber: 27, seatType: "recliner" },
      { isBooked: false, seatNumber: 28, seatType: "recliner" },
      { isBooked: false, seatNumber: 29, seatType: "recliner" },
      { isBooked: false, seatNumber: 30, seatType: "recliner" },
      { isBooked: false, seatNumber: 31, seatType: "recliner" },
      { isBooked: false, seatNumber: 32, seatType: "recliner" },
      { isBooked: false, seatNumber: 33, seatType: "recliner" },
      { isBooked: false, seatNumber: 34, seatType: "recliner" },
      { isBooked: false, seatNumber: 35, seatType: "recliner" },
      { isBooked: false, seatNumber: 36, seatType: "recliner" },
      { isBooked: false, seatNumber: 37, seatType: "recliner" },
    ],
    [
      { isBooked: false, seatNumber: 38, seatType: "gold" },
      { isBooked: false, seatNumber: 39, seatType: "gold" },
      { isBooked: false, seatNumber: 40, seatType: "gold" },
      { isBooked: false, seatNumber: 41, seatType: "gold" },
      { isBooked: false, seatNumber: 42, seatType: "gold" },
      { isBooked: false, seatNumber: 43, seatType: "gold" },
      { isBooked: false, seatNumber: 44, seatType: "gold" },
      { isBooked: false, seatNumber: 45, seatType: "gold" },
      { isBooked: false, seatNumber: 46, seatType: "gold" },
      { isBooked: false, seatNumber: 47, seatType: "gold" },
      { isBooked: false, seatNumber: 48, seatType: "gold" },
      { isBooked: false, seatNumber: 49, seatType: "gold" },
      { isBooked: false, seatNumber: 50, seatType: "gold" },
      { isBooked: false, seatNumber: 51, seatType: "gold" },
      { isBooked: false, seatNumber: 52, seatType: "gold" },
      { isBooked: false, seatNumber: 53, seatType: "gold" },
    ],
    [
      { isBooked: false, seatNumber: 54, seatType: "gold" },
      { isBooked: false, seatNumber: 55, seatType: "gold" },
      { isBooked: false, seatNumber: 56, seatType: "gold" },
      { isBooked: false, seatNumber: 57, seatType: "gold" },
      { isBooked: false, seatNumber: 58, seatType: "gold" },
      { isBooked: false, seatNumber: 59, seatType: "gold" },
      { isBooked: false, seatNumber: 60, seatType: "gold" },
      { isBooked: false, seatNumber: 61, seatType: "gold" },
      { isBooked: false, seatNumber: 62, seatType: "gold" },
      { isBooked: false, seatNumber: 63, seatType: "gold" },
    ],
    [
      { isBooked: false, seatNumber: 64, seatType: "gold" },
      { isBooked: false, seatNumber: 65, seatType: "gold" },
      { isBooked: false, seatNumber: 66, seatType: "gold" },
      { isBooked: false, seatNumber: 67, seatType: "gold" },
    ],
  ]);

  const [selectedSeats, setSelectedSeats] = useState<
    { seatNumber: number; seatType: string }[]
  >([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const priceMap: { [key: string]: number } = {
    premium: 300,
    recliner: 200,
    gold: 100,
  };
  useEffect(() => {
    setTotalPrice(
      selectedSeats.reduce((sum, seat) => sum + priceMap[seat.seatType], 0)
    );
  }, [selectedSeats]);

  const confirmBooking = () => {
    setSeats((row) => {
      return row.map((col) => {
        return col.map((seat) => {
          const shouldBook =
            seat.isBooked ||
            selectedSeats.some((v) => v.seatNumber === seat.seatNumber);

          return { ...seat, isBooked: shouldBook };
        });
      });
    });

    setTotalPrice(0);
    setSelectedSeats([]);
  };

  const handleSeatBooking = (seat: {
    seatType: string;
    seatNumber: number;
  }) => {
    setSelectedSeats((prev) => {
      if (prev.some((v) => v.seatNumber === seat.seatNumber)) {
        return prev.filter((v) => v.seatNumber !== seat.seatNumber);
      } else {
        return [...prev, seat];
      }
    });
  };

  return (
    <div>
      <div>
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((seat) => (
              <div
                onClick={() => handleSeatBooking(seat)}
                key={seat.seatNumber}
                className={` h-12 w-12 flex flex-col justify-center items-center cursor-pointer border border-gray-400 m-1 ${
                  seat.seatType === "premium" ? "bg-yellow-200" : ""
                } ${seat.seatType === "recliner" ? "bg-green-200" : ""} ${
                  seat.seatType === "gold" ? "bg-red-200" : ""
                }
                ${
                  selectedSeats.some(
                    (selectedSeat) =>
                      selectedSeat.seatNumber === seat.seatNumber
                  )
                    ? "!bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }
                ${
                  seat.isBooked === true
                    ? "!bg-gray-400 pointer-events-none"
                    : ""
                }
                `}
              >
                {seat.seatNumber}
                <br />
                <div className="font-bold">₹ {priceMap[seat.seatType]}</div>
              </div>
            ))}
          </div>
        ))}

        <div>
          <div>
            <Button variant="contained" onClick={confirmBooking}>
              Book
            </Button>
          </div>
          <div className="font-bold text-2xl">₹ {totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieBooking;
