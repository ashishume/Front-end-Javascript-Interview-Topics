import { Fragment, forwardRef } from "react";

const InputField = forwardRef(({ setValue, value }: any, ref: any) => {
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
        ref={ref}
        value={value}
      />
    </Fragment>
  );
});

export default InputField;
