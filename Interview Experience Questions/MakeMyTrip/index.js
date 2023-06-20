/**
 * 1. Create a makeDebounce method to avoid multple calls
 * 2. Flaten the object give the respective object
 const obj = {
  a: {
    b: {
      c: {
        d: 44,
        name: "shyam",
      },
    },
    f: {
      j: {
        k: 56,
        city: "Gurgaon",
        skills: ["swimming", "dancing"],
      },
    },
  },
};
Expected output: 
Output = {
  d: 44,
  name: "Shivansh",
  k: 56,
  city: "Gurgaon",
};

 * 3. Create a method to convert from source to output
 source:{'x':'a', 'y':'b', 'z':'a'}
 output: {'a':['x','z'], 'b':['y']}
 */