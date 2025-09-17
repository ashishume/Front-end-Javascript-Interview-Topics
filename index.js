function mergeData(sessions) {
  let map = [];
  sessions.map(({ user, duration, equipment }) => {
    if (!map[user]) {
      map[user] = {
        duration,
        equipment,
      };
    } else {
      let arr = [...map[user].equipment, ...equipment];
      arr.sort();
      map[user] = {
        duration: map[user].duration + duration,
        equipment: arr,
      };
    }
  });
}

console.log(
  mergeData([
    { user: 8, duration: 50, equipment: ["bench"] },
    { user: 7, duration: 150, equipment: ["dumbbell"] },
    { user: 1, duration: 10, equipment: ["barbell"] },
    { user: 7, duration: 100, equipment: ["bike", "kettlebell"] },
    { user: 7, duration: 200, equipment: ["bike"] },
    { user: 2, duration: 200, equipment: ["treadmill"] },
    { user: 2, duration: 200, equipment: ["bike"] },
  ])
);
