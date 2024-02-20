import { useEffect } from 'react';
import { useState } from 'react';

export const useDebouncedValue = (queryValue, time) => {
  const [value, setValue] = useState(queryValue);

  useEffect(() => {
    const timeOutId = setTimeout(() => setValue(queryValue), time);
    return () => clearTimeout(timeOutId);
  }, [queryValue, time]);

  return value;
};
