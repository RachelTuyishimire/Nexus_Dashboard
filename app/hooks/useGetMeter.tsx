import { getMeters } from "../utilities/utils";
import { useEffect, useState } from "react";

interface MetersData {
    year: any;
    id: number;
    meter_serial_number: string;
    current_reading: string;
    status: string;
   
}

const useGetMeter = () => {
const [meters, setMeter] = useState<MetersData[]>([]);
  
  useEffect(() => {
    (async () => {
      const meters = await getMeters(); 
      setMeter(meters);
    })();
  }, []);
  return { meters };
};

export default useGetMeter;
