import { useState, useEffect } from 'react';
import { getUsers } from '../utilities/utils'; 

const useGetNumberOfUsers = () => {
  const [numberOfUsers, setNumberOfUsers] = useState<number>(0);

  useEffect(() => {
    getUsers() 
      .then((data) => {
        setNumberOfUsers(data.length);
      })
  }, []);

  return { numberOfUsers };
};

export default useGetNumberOfUsers;
