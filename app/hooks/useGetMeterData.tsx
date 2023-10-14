import { useState, useEffect } from 'react';
import { getMeters } from '../utilities/utils';

interface MeterData {
  label: string;
  value: number;
}
const useGetMeterData = () => {
const [graphData, setMeterData] = useState<MeterData[]>([]);

  useEffect(() => {
    getMeters() 
      .then((data) => {
        const processedData: MeterData[] = data.map((meter: { meter_serial_number: any; current_reading: string; }) => ({
          label: meter.meter_serial_number,
          value: parseFloat(meter.current_reading),
        }));

        setMeterData(processedData);
      })
  }, []);

  return { graphData };
};

export default useGetMeterData;
