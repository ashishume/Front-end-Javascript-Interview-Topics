import { useEffect, useState } from "react";

const MovieBooking = () => {
  const [seats, setSeats] = useState([
    [
      { seatNumber: 1, seatType: "premium" },
      { seatNumber: 2, seatType: "premium" },
      { seatNumber: 3, seatType: "premium" },
      { seatNumber: 4, seatType: "premium" },
      { seatNumber: 5, seatType: "premium" },
      { seatNumber: 7, seatType: "premium" },
      { seatNumber: 8, seatType: "premium" },
      { seatNumber: 9, seatType: "premium" },
      { seatNumber: 10, seatType: "premium" },
      { seatNumber: 11, seatType: "premium" },
      { seatNumber: 12, seatType: "premium" },
      { seatNumber: 13, seatType: "premium" },
      { seatNumber: 14, seatType: "premium" },
      { seatNumber: 15, seatType: "premium" },
      { seatNumber: 16, seatType: "premium" },
      { seatNumber: 17, seatType: "premium" },
      { seatNumber: 18, seatType: "premium" },
      { seatNumber: 19, seatType: "premium" },
      { seatNumber: 20, seatType: "premium" },
    ],
    [
      { seatNumber: 21, seatType: "recliner" },
      { seatNumber: 22, seatType: "recliner" },
      { seatNumber: 23, seatType: "recliner" },
      { seatNumber: 24, seatType: "recliner" },
      { seatNumber: 25, seatType: "recliner" },
      { seatNumber: 26, seatType: "recliner" },
      { seatNumber: 27, seatType: "recliner" },
      { seatNumber: 28, seatType: "recliner" },
      { seatNumber: 29, seatType: "recliner" },
      { seatNumber: 30, seatType: "recliner" },
      { seatNumber: 31, seatType: "recliner" },
      { seatNumber: 32, seatType: "recliner" },
      { seatNumber: 33, seatType: "recliner" },
      { seatNumber: 34, seatType: "recliner" },
      { seatNumber: 35, seatType: "recliner" },
      { seatNumber: 36, seatType: "recliner" },
      { seatNumber: 37, seatType: "recliner" },
    ],
    [
      { seatNumber: 38, seatType: "gold" },
      { seatNumber: 39, seatType: "gold" },
      { seatNumber: 40, seatType: "gold" },
      { seatNumber: 41, seatType: "gold" },
      { seatNumber: 42, seatType: "gold" },
      { seatNumber: 43, seatType: "gold" },
      { seatNumber: 44, seatType: "gold" },
      { seatNumber: 45, seatType: "gold" },
      { seatNumber: 46, seatType: "gold" },
      { seatNumber: 47, seatType: "gold" },
      { seatNumber: 48, seatType: "gold" },
      { seatNumber: 49, seatType: "gold" },
      { seatNumber: 50, seatType: "gold" },
      { seatNumber: 51, seatType: "gold" },
      { seatNumber: 52, seatType: "gold" },
      { seatNumber: 53, seatType: "gold" },
    ],
    [
      { seatNumber: 54, seatType: "gold" },
      { seatNumber: 55, seatType: "gold" },
      { seatNumber: 56, seatType: "gold" },
      { seatNumber: 57, seatType: "gold" },
      { seatNumber: 58, seatType: "gold" },
      { seatNumber: 59, seatType: "gold" },
      { seatNumber: 60, seatType: "gold" },
      { seatNumber: 61, seatType: "gold" },
      { seatNumber: 62, seatType: "gold" },
      { seatNumber: 63, seatType: "gold" },
    ],
    [
      { seatNumber: 64, seatType: "gold" },
      { seatNumber: 65, seatType: "gold" },
      { seatNumber: 66, seatType: "gold" },
      { seatNumber: 67, seatType: "gold" },
    ],
    [{ seatNumber: 68, seatType: "gold" }],
  ]);

  const [selectedSeats, setSelectedSeats] = useState<
    { seatNumber: number; seatType: string }[]
  >([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    selectedSeats.map((seat) => {
      if (seat.seatType === "premium") {
        setTotalPrice((prev) => prev + 300);
      }
      if (seat.seatType === "recliner") {
        setTotalPrice((prev) => prev + 200);
      }
      if (seat.seatType === "gold") {
        setTotalPrice((prev) => prev + 100);
      }
    });
  }, [selectedSeats]);

  return (
    <div>
      <div>
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((seat) => (
              <div
                onClick={() => setSelectedSeats((prev) => [...prev, seat])}
                key={seat.seatNumber}
                className={` h-12 w-12 flex justify-center items-center cursor-pointer border border-gray-400 m-1  ${
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
                `}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        ))}
        ₹ {totalPrice}
      </div>
    </div>
  );
};

export default MovieBooking;
