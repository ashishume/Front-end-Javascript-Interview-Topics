/**
 * 
Create a function to verify whether a set of time slots covers every minute of a week, ensuring 24/7 coverage. 
Each time slot is defined by a start day and start time, and an end day and end time. The function should return 
true if the given slots cover the entire week from Monday 00:00 to Sunday 23:59, and false if the slots do 
not cover 24/7 or if there are any overlaps between the slots or if it exceeds.
*/

// 1 -> ‘MONDAY’
// 2 -> ‘TUESDAY’
// 3 -> ‘WEDNESDAY
// 4 -> ‘THURSDAY’
// 5 -> ‘FRIDAY’
// 6 -> ‘SATURDAY’
// 7 -> ‘SUNDAY’
const slot1 = [
    {
      startDay: "1",
      startTime: "00:00",
      endDay: "3",
      endTime: "23:59",
    },
    {
      startDay: "4",
      startTime: "00:00",
      endDay: "5",
      endTime: "12:00",
    },
    {
      startDay: "5",
      startTime: "12:01",
      endDay: "6",
      endTime: "23:59",
    },
    {
      startDay: "7",
      startTime: "00:00",
      endDay: "7",
      endTime: "23:59",
    },
  ]; // true
  const slots2 = [
    {
      startDay: "1",
      startTime: "00:00",
      endDay: "3",
      endTime: "23:59",
    },
    {
      startDay: "3",
      startTime: "12:00",
      endDay: "5",
      endTime: "12:00",
    },
    //4 is missing
    {
      startDay: "5",
      startTime: "12:00",
      endDay: "6",
      endTime: "23:59",
    },
    {
      startDay: "6",
      startTime: "00:00",
      endDay: "7",
      endTime: "23:59",
    },
  ]; //false
  
  // 1 to 5 //
  
  const daysInWeek = 7;
  const minutesInDay = 1440; //1440
  const minutesInWeek = (daysInWeek - 1) * minutesInDay; // 10080
  
  function createMinutesArray() {
    return new Array(minutesInWeek).fill(false);
  }
  
  function timeToMinutes(day, time) {
    const [hours, minutes] = time.split(":").map(Number);
    return (day - 1) * minutesInDay + hours * 60 + minutes;
  }
  
  function markTimeSlots(minutesArray, timeSlots) {
    timeSlots.forEach(({ startDay, startTime, endDay, endTime }) => {
      const startMinuteWeek = timeToMinutes(startDay, startTime);
      const endMinuteWeek = timeToMinutes(endDay, endTime);
      for (let i = startMinuteWeek; i <= endMinuteWeek; i++) {
        if (minutesArray[i % minutesInWeek]) {
          return false;
        }
        minutesArray[i % minutesInWeek] = true;
      }
    });
    return true;
  }
  
  function isEveryMinuteCovered(timeSlots) {
    const minutesArray = createMinutesArray();
    markTimeSlots(minutesArray, timeSlots);
    return minutesArray.every(Boolean);
  }
  
  console.log(isEveryMinuteCovered(slot1));
  // khadir@getmyparking.com
  
  
  // add(5) => 5;
  // add(10) => 15;
  // add(15) => 30;
  
  function sum(a) {
    return function (b = 0) {
      if (b) return sum(a + b);
      return a;
    };
  }
  
  console.log(sum(5)());
  const a = sum(5);
  console.log(a(10)());
  
  const array3 = [1, 2, 3, 2, 2, 3, 4, 5, 6, 4, 5, 6];
  // highest frequency :  2 with 3 times
  
  function findMostOccuring(array) {
    const mp = {};
    for (const num of array) {
      if (mp[num]) {
        mp[num]++;
      } else {
        mp[num] = 1;
      }
    }
  
    let maxCount = 0;
    let mostOccurNum = array[0];
  
    for (const num in mp) {
      if (mp[num] > maxCount) {
        maxCount = mp[num];
        mostOccurNum = num;
      }
    }
  
    return { maxNumber: mostOccurNum, maxCount };
  }
  
  console.log(findMostOccuring(array3));
  