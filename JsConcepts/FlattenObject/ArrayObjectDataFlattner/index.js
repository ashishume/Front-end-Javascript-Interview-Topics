const data = {
  id: 1,
  name: "John Doe",
  position: "Manager",
  directReports: [
    {
      id: 2,
      name: "Jane Smith",
      position: "Team Lead",
      directReports: [
        {
          id: 3,
          name: "Bob Johnson",
          position: "Software Engineer",
          directReports: [],
        },
      ],
    },
    {
      id: 4,
      name: "Alice Williams",
      position: "Team Lead",
      directReports: [
        {
          id: 5,
          name: "Charlie Brown",
          position: "UI/UX Designer",
          directReports: [
            {
              id: 10,
              name: "Charlie Brown",
              position: "UI/UX Designer",
              directReports: [],
            },
          ],
        },
      ],
    },
  ],
};

const flattenEmployeeData = (data) => {
  let flatArray = [];

  const flatten = (employee) => {
    flatArray.push(employee);
    if (employee.directReports.length > 0) {
      employee.directReports.forEach((report) => {
        flatten(report);
      });
    }
  };

  flatten(data);

  return flatArray;
};

const flattenedData = flattenEmployeeData(data);
console.log(flattenedData);
