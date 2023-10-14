import { getUsers } from "../utilities/utils";
import { useEffect, useState } from "react";

interface UserData {
  name: string;
  location: string;
  company_name: string;
  phonenumber: string;
  email: string;
}


const useGetUsers = () => {
  const [customers, setCustomers] = useState<UserData[]>([]);
  const [refreshToggle, setRefreshToggle] = useState(false);

  const fetchUserData = async () => {
 
      const users = await getUsers();
      setCustomers(users);

  };

  useEffect(() => {
    fetchUserData();
  }, [refreshToggle]);

  return {
    customers,
    refetch: () => setRefreshToggle(!refreshToggle), 
  };
};

export default useGetUsers;
