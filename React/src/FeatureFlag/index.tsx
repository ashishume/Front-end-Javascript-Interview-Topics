import { createContext, useState } from "react";
export const FeaturesFlagProvider = createContext(null as any);
const FeatureFlag = ({ children }: any) => {
  const [featureFlags, setFeatureFlags] = useState({
    showInput: true,
    showButton: true,
  });
  return (
    <FeaturesFlagProvider.Provider value={{ featureFlags, setFeatureFlags }}>
      {children}
    </FeaturesFlagProvider.Provider>
  );
};

export default FeatureFlag;
