export const markActive = (
  selectedVal: any,
  tenureYears: any,
  setTenueYears: any,
  setActiveYear: any
) => {
  let newValue = tenureYears.map((val: any) => {
    if (val.isActive) {
      return {
        isActive: false,
        value: val.value,
      };
    }
    if (val.value === selectedVal.value) {
      setActiveYear({
        isActive: true,
        value: val.value,
      });
      return {
        isActive: true,
        value: val.value,
      };
    }
    return val;
  });
  setTenueYears(newValue);
};

export const addCommas = (num: number) => {
  let numStr = num.toString();
  let result = "";
  for (let i = numStr.length - 1, count = 0; i >= 0; i--, count++) {
    if (count % 3 === 0 && count !== 0) {
      result = "," + result;
    }
    result = numStr[i] + result;
  }
  return result;
};
