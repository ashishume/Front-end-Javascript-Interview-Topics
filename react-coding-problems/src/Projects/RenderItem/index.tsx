const RenderItemComponent = () => {
  const arr = [
    { id: 1, name: "Ashish" },
    { id: 2, name: "Akash" },
    { id: 3, name: "Ash" },
    { id: 4, name: "Dev" },
  ];
  return (
    <>
      <List
        items={arr}
        renderItem={({ id, name }: any) => <Row key={id} name={name} />}
      />
    </>
  );
};

const List = ({ renderItem, items }: any) => {
  return (
    <ul>
      {items.map((value: any) => {
        return renderItem(value);
      })}
    </ul>
  );
};

const Row = ({ name, id }: any) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{id}</p>
    </div>
  );
};
export default RenderItemComponent;
