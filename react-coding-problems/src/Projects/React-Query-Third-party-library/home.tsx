import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const HomeReactQuerySample = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const queryClient = useQueryClient();

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/"
      );

      if (response.ok) {
        return response.json();
      }
    },
  });

  /**
   * POST method to update new data to post api
   * @param newPost
   * @returns
   */
  const createPost = async (newPost: any): Promise<any> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (error) return <div>Error occurred: {(error as Error).message}</div>;
  if (isFetching) return <div>Still loading...</div>;
  if (isLoading) return <div>Data is loading...</div>;
  if (data)
    return (
      <div>
        Data loaded
        <button
          onClick={() => {
            mutation.mutate({
              title: "sample title",
              body: "sample body",
              userId: 111,
            });
          }}
        >
          Add Todo
        </button>
      </div>
    );
};

export default HomeReactQuerySample;
