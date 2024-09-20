import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeReactQuerySample from "./home";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const ReactQueryLibrary = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeReactQuerySample />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default ReactQueryLibrary;
