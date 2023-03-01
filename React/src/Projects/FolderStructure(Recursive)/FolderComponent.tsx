import React, { Fragment, useState } from "react";

const FolderComponent = ({ explorer }: any) => {
  const [expand, isExpanded] = useState(false);

  if (explorer?.isFolder) {
    return (
      <Fragment>
        <div
          onClick={() => isExpanded(!expand)}
          style={{ fontSize: 20, fontWeight: 600 }}
        >
          {explorer?.name}
        </div>

        <div style={{ display: expand ? "block" : "none" }}>
          {explorer?.items.map((value: any) => {
            return <FolderComponent explorer={value} key={value?.name} />;
          })}
        </div>
      </Fragment>
    );
  } else {
    return (
      <div style={{ paddingLeft: 10, fontSize: 18 }}>{explorer?.name}</div>
    );
  }
};

export default FolderComponent;
