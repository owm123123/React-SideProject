import React, { useEffect } from 'react';
import { useState } from 'react';

export function useFetch(callBackFn) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [userPlaces, setUserPlaces] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await callBackFn();
        setUserPlaces(places);
      } catch (error) {
        setError({
          message: error.message || 'Failed to fetch user places.',
        });
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  return {
    isFetching,
    error,
    userPlaces,
  };
}
