import { useContext } from "react";
import { FeaturesFlagProvider } from ".";

const HomePageFeatureFlag = () => {
  const { featureFlags } = useContext(FeaturesFlagProvider);
  return (
    <div>
      {featureFlags?.showInput && <input placeholder="type anything..." />}
      {featureFlags?.showButton && <button>Show button</button>}
    </div>
  );
};

export default HomePageFeatureFlag;
