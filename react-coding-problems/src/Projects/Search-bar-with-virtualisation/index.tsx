import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { forwardRef, useEffect, useRef, useState } from "react";

const SearchWithVirtualisation = () => {
  const limit = 50;
  const [skip, setSkip] = useState(0);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

  // Accumulate users when new data arrives
  useEffect(() => {
    if (data?.users) {
      if (skip === 0) {
        // First load - replace all users
        setAllUsers(data.users);
      } else {
        // Subsequent loads - append new users
        setAllUsers((prev) => [...prev, ...data.users]);
      }

      // Check if there's more data to load
      const total = data.total || 0;
      const currentCount = skip + data.users.length;
      setHasMore(currentCount < total);
      setIsLoadingMore(false);
    }
  }, [data, skip]);

  const handleReachBottom = () => {
    if (!isLoading && !isLoadingMore && hasMore && data) {
      setIsLoadingMore(true);
      setSkip((prev) => prev + limit);
    }
  };

  return (
    <BotttomTrigger onReachBottom={handleReachBottom}>
      {isLoading && skip === 0 && <div>Loading...</div>}
      {error && <div>Error loading users</div>}
      <div className="p-2 m-1">
        {allUsers.map((user: any) => (
          <div key={user.id}>{user.firstName}</div>
        ))}
        {isLoadingMore && <div>Loading more...</div>}
        {!hasMore && allUsers.length > 0 && (
          <div className="text-center p-4">No more users to load</div>
        )}
      </div>
    </BotttomTrigger>
  );
};

const BotttomTrigger = forwardRef<
  HTMLDivElement,
  { onReachBottom?: () => void; children: React.ReactNode }
>(({ onReachBottom, children }, ref) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current || !onReachBottom) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onReachBottom();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [onReachBottom]);

  return (
    <div ref={ref}>
      {children}
      <div ref={sentinelRef} style={{ height: "1px" }} />
    </div>
  );
});

BotttomTrigger.displayName = "BotttomTrigger";

export default SearchWithVirtualisation;
