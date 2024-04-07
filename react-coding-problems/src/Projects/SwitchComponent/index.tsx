const CustomSwitch = ({ children, value }: any) => {
  const cases: any = [];
  const defaults: any = [];
  children.map((child: any) => {
    if (child.type.name === "CustomCase") {
      if (typeof child.props.value === "function") {
        if (child.props.value(value)) {
          cases.push(child);
        }
      } else if (value === child.props.value) {
        cases.push(child);
      }
    } else if (child.type.name === "DefaultCase") {
      defaults.push(child);
    }
  });

  if (cases.length > 0) {
    return cases;
  } else {
    return defaults;
  }
};

const CustomCase = ({ children }: any) => {
  return <>{children}</>;
};

const DefaultCase = ({ children }: any) => {
  return <>{children}</>;
};

const SwitchComponent = () => {
  return (
    <>
      <CustomSwitch value={5}>
        <CustomCase value={(e: any) => e < 10}>
          <div>Hello 20</div>
        </CustomCase>
        <CustomCase value="20">Hello 20</CustomCase>
        <CustomCase value="30">Hello 30</CustomCase>
        <CustomCase value="10">
          <div>Hello 10</div>
        </CustomCase>
        <DefaultCase>Hello 40</DefaultCase>
      </CustomSwitch>
    </>
  );
};

export default SwitchComponent;
