import React, { useEffect, useState } from "react";

interface FetchResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export default function useFetch<T = unknown>(url: string): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setData(json.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setisLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}
