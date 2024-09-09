import { useRef, useState, useEffect } from 'react';
import { User, UserSchema } from './userSchema';

export const useFetch = (url: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<User>();

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      abortControllerRef.current = new AbortController();

      setError(false);
      setIsLoading(true);

      try {
        const response = await fetch(`https://api.github.com/users/${url}`);

        if (response.status !== 200) {
          setError(true);
          return;
        }

        const dataTemp = await response.json();
        const datas = UserSchema.parse(dataTemp);
        setData(datas);
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          return;
        }
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};
