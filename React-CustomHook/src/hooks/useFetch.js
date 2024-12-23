import React, { useEffect } from 'react';
import { useState } from 'react';

export function useFetch(callBackFn, init) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(init);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const places = await callBackFn();
        setFetchedData(places);
      } catch (error) {
        setError({
          message: error.message || 'Failed to fetch data!',
        });
      }
      setIsFetching(false);
    }
    fetchData();
  }, [callBackFn, setFetchedData]);

  return {
    isFetching,
    error,
    fetchedData,
    setFetchedData,
  };
}
