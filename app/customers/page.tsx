'use client'
import React, { ChangeEvent, useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import useGetUsers from '../hooks/useGetUser';
import UserRegistration from '../hooks/UserRegistration';
import Link from 'next/link';
import Layout from '../components/Layout';
import error from 'next/error';
import ReactPaginate from 'react-paginate';

interface FormData {
  name: string;
  email: string;
  phonenumber: string;
  location: string;
  company_name: string;
  password: string;
  username: string;
}

const CustomersList = () => {
const {  refetch } = useGetUsers();
const [filter, setFilter] = useState('all');
const [customers, setCustomers] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [showForm, setShowForm] = useState(false);
const [formData, setFormData] = useState<FormData>({
  name: '',
  email: '',
  phonenumber: '',
  location:'',
  company_name: '',
  password: '',
  username: '',
})

const [currentPage, setCurrentPage] = useState(0);
const itemsPerPage = 10;

const{
  errors,
  handleInputChange,
  handleSubmit,
} = UserRegistration();

const handleFilterChange = (selectedFilter: React.SetStateAction<string>) => {
    setFilter(selectedFilter);};
  const filteredData = customers.filter((item: { name: string; company_name: string; location: string; phonenumber: string; }) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phonenumber.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'all') {
      return matchesSearch;
    } else if (filter === 'company') {
      return item.company_name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filter === 'location') {
      return item.location.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filter === 'phonenumber') {
      return item.phonenumber.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });

  const handleAddUser = () => {
    setShowForm(true);
  };
  const handleFormSubmit = async () =>{
    try{
      const registrationData = {
        name: formData.name,
        email: formData.email,
        phonenumber: formData.phonenumber,
        location: formData.location,
        company_name: formData.company_name,
        password: formData.password,
        username: formData.username,
      };
      setCustomers((prevCustomers)=>[registrationData, ...prevCustomers]);

      setFormData({
        name: '',
        email: '',
        phonenumber: '',
        location: '',
        company_name: '',
        password: '',
        username: '',
      });
      setShowForm(false);
      handleRegistrationSubmit(registrationData);
      refetch();
    } catch(error){
      console.log('User not added:', error);
    }
    };

    const paginatedData = filteredData.slice(
      currentPage * itemsPerPage,
      currentPage * itemsPerPage + itemsPerPage
    );
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const handlePageChange = ({ selected }: { selected: number }) => {
      setCurrentPage(selected);
    };
  

  return (
    
    <div>
      <Layout>
    <div className=" customer flex h-screen -mt-90 px-20">
      <div className="flex- p-4 overflow-y-auto bg-white text-black">
        <div className="">
         
          <h1 className="text-3xl mt-10 font-bold my-2 px-4">Customers</h1>
          <button className="w-1/5 bg-blue-800 mt-[-4%] flex ml-[70%] justify-center text-white p-3 rounded-full hover:bg-blue-700 text-xl font-bold mx-auto"
          onClick={handleAddUser}>
      Add a user
        </button>
        {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex items-center justify-center z-50">
          <div className="popup-content">
          <span
  className="close text-white text-xl ml-[100%] cursor-pointer"
  onClick={() => setShowForm(false)}
>
  &times;
</span>
            <h2 className="text-white justify-center text-[30px] mb-4 flex font-extrabold">Add A New User</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <input
                      className="border border-gray-300 py-2 px-4  w-full rounded"
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-4'>
                <div>
                  <input
                    className="border border-gray-300 py-2  mt-5 px-4 w-full rounded"
                    type="phonenumber"
                    placeholder="Phone Number"
                    value={formData.phonenumber || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, phonenumber: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <input
                    className="border border-gray-300 py-2 px-4 w-full rounded"
                    type="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                </div>
                </div>
                <div className='grid grid-cols-1 gap-4'>
                  <div>
                  <input
                    className="border border-gray-300 py-2 mt-5 px-4 w-full rounded"
                    type="company_name"
                    placeholder="Company Name"
                    value={formData.company_name || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, company_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    className="border border-gray-300 py-2 px-4 w-full rounded"
                    type="password"
                    placeholder="Password"
                    value={formData.password || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <input
                    className="border border-gray-300 py-2 px-4 w-full rounded"
                    type="username"
                    placeholder="Username"
                    value={formData.username || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    required
                  />
                </div>
                
                </div>
              </div>
              <div className="flex justify-center font-bold text-xl pt-10 ">
                <button type="submit" className="bg-blue-500 text-white py-2 px-20 rounded" onClick={handleFormSubmit}>
                  save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        <br/>
        <div className="relative">
            <input type="search"placeholder="Search..."className="border border-gray-300 rounded-full p-2 text-black bg-gray-100 pl-10 pr-6 w-3/5 mx-60"
              onChange={(e) => setSearchQuery(e.target.value)}value={searchQuery}/>
          </div>
          <br/>
          <h1 className="text-2xl font-semibold text-blue-600 my-4 px-4">
            {`${filter === 'all' ? 'All' : filter}(${filteredData.length})`}
          </h1>
          <div className="mb-4 px-4 ml-20 mt-[-4%]">
            <div className="relative inline-flex">
              <select
                className="border border-black px-4 py-2 bg-white"
                onChange={(e) => handleFilterChange(e.target.value)}
                value={filter}>
                <option value="all">All</option>
                <option value="company">Company</option>
                <option value="location">Location</option>
                <option value="phonenumber">Phone Number</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <table className="table-auto w-[1200px] border-collapse">
            <thead>
              <tr>
                
                <th className="px-4 py-2 text-left">Customer</th>
                
                <th className="px-4 py-2 text-left">Company Name</th>
                <th className="px-4 py-2 text-left">Phone Number</th>
                <th className="px-4 py-2 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
            {paginatedData.map((item: { name: string; company_name: string; phonenumber: string; location: string; }, index: React.Key | null | undefined)  => (
  <tr key={index}>
    <td className="px-4 py-2 text-left text-gray-700">
      <Link href={'/meter/'}>
        {item.name}
      </Link>
    </td>
    <td className="px-4 py-2 text-left text-gray-700">{item.company_name}</td>
    <td className="px-4 py-2 text-left text-gray-700">{item.phonenumber}</td>
    <td className="px-4 py-2 text-left text-gray-700">{item.location}</td>
  </tr>
))}

            </tbody>
          </table>
          <div className="my-4 flex items-center">
  <ReactPaginate
    pageCount={totalPages}
    pageRangeDisplayed={5}
    marginPagesDisplayed={1}
    onPageChange={handlePageChange}
    previousLabel={'Previous'}
    nextLabel={'Next'}
    containerClassName={'pagination flex space-x-2'} 
    activeClassName={'bg-blue-900 text-white'}
    pageClassName={'bg-gray text-black px-3 py-1 rounded'} 
    previousClassName={'bg-gray-300 text-black px-3 py-1 rounded'} 
    nextClassName={'bg-gray-300 text-black px-3 py-1 rounded'} 
  />
</div>

        </div>
      </div>
    </div></Layout>
    </div>
  );
};
export default CustomersList;

function handleRegistrationSubmit(registrationData: { name: string; email: string; phonenumber: string; location: string; company_name: string; password: string; username: string; }) {
  throw new Error('Function not implemented.');
}