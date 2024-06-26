import { Button } from "@/components/ui/button";

const ErrorBoundaryComponent = () => {
  function throwCustomError() {
    try {
      throw new Error("some went wrong 2");
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }
  return <Button onClick={throwCustomError}>throw error</Button>;
};

export default ErrorBoundaryComponent;
