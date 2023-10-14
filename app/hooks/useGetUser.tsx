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
  const [customers, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      setUsers(users);
    })();
  }, []);

  return { customers };
};
export default useGetUsers;
