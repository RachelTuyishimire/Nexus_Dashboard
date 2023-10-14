import { useState, useEffect } from 'react';
import { getMeters } from '../utilities/utils';

const useGetNumberOfMeters = () => {
  const [numberOfMeters, setNumberOfMeters] = useState<number>(0);

  useEffect(() => {
    getMeters()
      .then((data) => {
        setNumberOfMeters(data.length);
      })
  }, []);

  return { numberOfMeters };
};

export default useGetNumberOfMeters;
