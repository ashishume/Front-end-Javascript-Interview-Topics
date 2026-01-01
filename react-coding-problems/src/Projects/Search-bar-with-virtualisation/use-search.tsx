import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSearchQuery = (query: any) => {
  const {
    isLoading: queryLoading,
    data: searchData,
    error: searchError,
  } = useQuery({
    queryKey: ["searchKey", query],
    queryFn: async ({ queryKey }) => {
      const [_, query] = queryKey;
      console.log(query);
      if (query) {
        const resp = await axios.get(
          `https://dummyjson.com/users/search?q=${query}`
        );

        return resp.data;
      }

      return "";
    },
  });

  return {
    queryLoading,
    searchData,
    searchError,
  };
};

export default useSearchQuery;
