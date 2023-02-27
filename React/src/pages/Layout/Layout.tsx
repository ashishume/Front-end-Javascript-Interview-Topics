import React from "react";
import "./Layout.scss";
const Layout = (props: any) => {
  return <div className="layout-container">{props.children}</div>;
};

export default Layout;
