import { useContext } from "react";
import { FeaturesFlagProvider } from ".";
import { Button } from "@/components/ui/button";

const HomePageFeatureFlag = () => {
  const { featureFlags } = useContext(FeaturesFlagProvider);
  return (
    <div>
      {featureFlags?.showInput && <input placeholder="type anything..." />}
      {featureFlags?.showButton && <Button>Show button</Button>}
    </div>
  );
};

export default HomePageFeatureFlag;
