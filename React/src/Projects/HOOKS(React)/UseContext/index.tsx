import React from "react";
import Child1 from "./ContextChildren/Child1";
import Child2 from "./ContextChildren/Child2";

export const UserContext = React.createContext("Username");
export const ChannelContext = React.createContext("surname");
const UseContext = () => {
  return (
    <UserContext.Provider value={"Ashish"}>
      <ChannelContext.Provider value={"Debnath"}>
        Child 1 (traditional way): <Child1 />
        <br />
        Child 2 (useContext hooks): <Child2 />
      </ChannelContext.Provider>
    </UserContext.Provider>
  );
};

export default UseContext;
