import { Fragment } from "react";

const InputField = ({ setValue }: any) => {
  return (
    <Fragment>
      <input
        type="text"
        placeholder="Tag someone"
        style={{
          width: "100%",
          height: "30px",
          margin: "5px auto",
          paddingLeft: "5px",
          borderRadius: "4px",
          border: "solid 1px gray",
        }}
        onChange={setValue}
      />
    </Fragment>
  );
};

export default InputField;
