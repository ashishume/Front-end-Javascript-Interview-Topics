const MemoryGame = () => {
  const emojis = [
    ["🐵", "🐶", "🦊", "🐱"],
    ["🦁", "🐯", "🐴", "🦄"],
    ["🐵", "🐶", "🦊", "🐱"],
    ["🦁", "🐯", "🐴", "🦄"],
  ];

  return (
    <div className="container">
      <div>Memory game</div>
      <div className="border inline-block">
        {emojis.map((row) => {
          return (
            <div className="flex justify-center gap-4">
              {row.map((col) => {
                return <div className="border inline-block m-2 p-3">{col}</div>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
