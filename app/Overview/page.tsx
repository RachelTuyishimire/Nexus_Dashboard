'use client'
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import useGetMeter from '../hooks/useGetMeter';
import useGetMeterData from '../hooks/useGetMeterData';
import useGetNumberOfMeters from '../hooks/useGetNumberOfMeters';
import useGetNumberOfUsers from '../hooks/useGetNumberOfUsers';
import Layout from '../components/Layout';

const Overview = () => {
  const { meters } = useGetMeter();
  const { graphData } = useGetMeterData();
  const { numberOfMeters } = useGetNumberOfMeters();
  const { numberOfUsers } = useGetNumberOfUsers();
  const totalReadings = meters.reduce((accumulator, meter) => {
    return accumulator + parseFloat(meter.current_reading);
  }, 0);
  const chartWidth = '850px';
  const chartHeight = '0px';
  const dataValues = graphData.map((item) => item.value);
  const [activeFilter, setActiveFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const data = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Meter Readings in kW',
        backgroundColor: 'rgba(43, 57, 189, 0.5',
        borderColor: 'rgba(43, 57, 189, 0.5',
        borderWidth: 1,
        data: dataValues,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Monthly Power Consumption'
        },
      },
    },
  };
  const filteredMeters = meters.filter((meter) => {
    const isActive = activeFilter === 'all' || (activeFilter === 'active' && meter.status === 'Active') || (activeFilter === 'inactive' && meter.status === 'Inactive');
    const isYearMatch = yearFilter === 'all' || yearFilter === meter.year.toString();
    return isActive && isYearMatch;
  });
  return (
    <div>
      <Layout>
    <div className="py-1">
      <div className="container mx-auto flex  flex-col items-center ml-20">
        <h2 className="text-3xl font-bold text-black mb-2 mt-[1%] ml-[-79%]">Overview</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-64 bg-blue-700 shadow-lg rounded-lg m-4 p-6  text-center relative">
            <h3 className="text-2xl font-semibold text-white">Overall Readings</h3>
            <p className="text-2xl text-white mt-2">{totalReadings.toFixed(2)}</p>
          </div>
          <div className="w-64 bg-blue-700 shadow-lg rounded-lg m-4 p-6 text-center relative">
            <h3 className="text-2xl font-semibold text-white">Meters</h3>
            <p className="text-3xl text-white mt-2">{numberOfMeters}</p>
          </div>
          <div className="w-64 bg-blue-700 shadow-lg rounded-lg m-4 p-6 text-center relative">
            <h3 className="text-2xl font-semibold text-white">Customers</h3>
            <p className="text-2xl text-white mt-2">{numberOfUsers}</p>
          </div>
        </div>
      </div>
      {/* Filter dropdown menu */}
      <div className="filter-menu ml-[40%] ">
        <label className="text-lg mr-2">Filter by Status:</label>
        <select onChange={(e) => setActiveFilter(e.target.value)} className='w-12 h-10 px-1 rounded-lg border bg-blue-900 text-white' >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <label className="text-lg mr-3 ml-4">Filter by Year:</label>
        <select onChange={(e) => setYearFilter(e.target.value)} className='w-12 h-10 px-1 rounded-lg border bg-blue-900 text-white'>
          <option value="all">All</option>
          {Array.from({ length: 24 }, (_, i) => {
            const year = 2001 + i;
            return (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <div className="flex flex-col items-center justify-center  mr-[-15%] mt-[2%]">
          <h2 className="text-1xl font-bold mb-2">Monthly Power Consumption</h2>
          <div style={{ width: chartWidth, height: chartHeight }}>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
      <div>
        <div className="details-section w-full mt-[44%] ml-[12%]">
          <h2 className="text-2xl font-bold mb-3 ">Details</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-2 py-1">Current Reading</th>
                <th className="text-left px-2 py-1">Meter Serial Number</th>
                <th className="text-left px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeters.slice(0, 4).map((meter, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{meter.current_reading}</td>
                  <td className="py-2 px-4">{meter.meter_serial_number}</td>
                  <td className="py-2 px-4 flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        meter.status === 'Inactive' ? 'bg-red-600' : 'bg-green-500'
                      }`}
                    ></div>
                    <span className="ml-4">
                      {meter.status === 'Inactive' ? 'Inactive' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Layout>
    </div>
  );
};
export default Overview;