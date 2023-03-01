import React from "react";

const ListItems = ({ data }: any) => {
  return (
    <ol>
      {data.map((value: any) => {
        return (
          <>
            <li>{value.label}</li>
            {
              <ul>
                {value?.children?.length ? (
                  <ListItems key={value.id} data={value.children} />
                ) : (
                  <li>{value.label}</li>
                )}
              </ul>
            }
          </>
        );
      })}
    </ol>
  );
};

export default ListItems;
