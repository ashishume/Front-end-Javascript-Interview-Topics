import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchUsers = (hasMore: boolean, limit: number, skip: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["fetch-users", limit, skip],
    queryFn: async ({ queryKey }): Promise<any> => {
      const [, limit, skip] = queryKey as [string, number, number];
      const response = await axios.get(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );
      return response.data;
    },
    enabled: hasMore, // Don't fetch if no more data
  });

  return {
    isLoading,
    data,
    error,
  };
};

export default useFetchUsers;
