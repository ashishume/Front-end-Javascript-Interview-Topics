import React from "react";

interface DataDisplayInt {
  value: string;
}

const DataDisplay = ({ value }: DataDisplayInt) => {
  return <>{value}</>;
};

export default DataDisplay;
