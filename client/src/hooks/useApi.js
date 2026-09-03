import { useState, useCallback } from 'react';

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (asyncFn, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await asyncFn(...args);
      setData(response.data || response);
      return response.data || response;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};

export default useApi;
