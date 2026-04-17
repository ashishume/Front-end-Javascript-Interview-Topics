
// API for pagination https://dummyjson.com/products?limit=10&skip=20

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

// Example of passing limit and skip as variables to useQuery
const Paginate = () => {
    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);

    const { data, isLoading, error } = useQuery({
        // Pass limit and skip as part of the queryKey array
        queryKey: ["fetch-server", limit, skip],
        // Destructure from queryKey array in queryFn
        queryFn: ({ queryKey }) => {
            const [_, currLimit, currSkip] = queryKey;
            return axios
                .get(`https://dummyjson.com/products?limit=${currLimit}&skip=${currSkip}`)
                .then((r) => r.data);
        },
    });

    // Example UI controls for pagination
    return (
        <div>
            <button
                onClick={() => setSkip((prev) => Math.max(prev - limit, 0))}
                disabled={skip === 0}
            >
                Prev
            </button>
            <button onClick={() => setSkip((prev) => prev + limit)}>
                Next
            </button>
            <div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Paginate;