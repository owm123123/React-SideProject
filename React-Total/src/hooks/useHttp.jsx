import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

async function sendHttpRequest(url, config) {
  const request = await fetch(url, config);
  const resData = await request.json();

  if (!request.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request'
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function cleanData() {
    setData(null);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || 'Something went wrong !');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    cleanData,
  };
}
