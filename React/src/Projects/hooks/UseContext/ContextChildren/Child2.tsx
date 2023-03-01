import React, { useContext } from "react";
import { ChannelContext, UserContext } from "..";
const Child2 = () => {
  const user = useContext(UserContext);
  const title = useContext(ChannelContext);
  return (
    <>
      Hello
      {user}, {title}
    </>
  );
};

export default Child2;
