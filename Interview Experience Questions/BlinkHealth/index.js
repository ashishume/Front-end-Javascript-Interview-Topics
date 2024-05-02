// Q. coding question

/**
Pull Request:
Title: Adding function to find store with cheapest drug
Description: The function finds the store that carries a specific drug at the lowest price
*/
const get_drug_stores = () => {
    // Assume this function gets data from Database and builds it into the following structure before returning:
    const drug_stores = [
      {
        name: "CVS",
        drug_codes: [12345, 23456, 34567, 45678],
        cost_to_drug_codes: {
          2099: [12345, 34567],
          2499: [23456, 45678],
        },
      },
      {
        name: "Walgreens",
        drug_codes: [12345, 23456, 34567, 45678],
        cost_to_drug_codes: {
          2200: [12345, 34567],
          2399: [23456, 45678],
        },
      },
      {
        name: "Blink Health",
        drug_codes: [56789, 67890, 78901, 12345],
        cost_to_drug_codes: {
          2100: [56789, 67890],
          2000: [78901, 12345],
        },
      },
    ];
    return drug_stores;
  };
  
  // Find Drug Store with drug
  const find_store = (drug_code, max_cost_usd_cents) => {
    let temp = [];
  
    get_drug_stores().forEach((store) => {
      Object.keys(store["cost_to_drug_codes"]).forEach((cost) => {
        if (
          cost <= max_cost_usd_cents &&
          store["cost_to_drug_codes"][cost].includes(drug_code)
        ) {
          temp.push(store);
        }
      });
    });
  
    return temp;
  };
  
  console.log(find_store(34567, 3000));
  