"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../hooks/UserLogin";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const responseData = await loginUser(formData);

      if (responseData.success) {
        
      } else {
        setResponse(responseData.message || "Please input correct login details");

        setTimeout(() => {
          setResponse(null);
        }, 3000);
      }
      router.push('/Overview')
    } catch (error: any) {
      setResponse(error.message);
    }
  };

  return (
    <div className="bg-gray-200">
      <div className="bg-blue-700 h-[20%] w-full absolute top-0 rounded-bl-[1000px]"></div>
      <div className=" h-screen flex  flex-col">
        <div className="  flex-1 mt-24 flex justify-center items-center">
          <div className="box bg-white w-1/4 mt-2 p-9 mb-16 rounded shadow-md">
           
             <Image
          src="/niu.png"
          alt="Logo"
          width={300}
          height={300}
          style={{ marginTop: '10px',marginBottom:'20px', marginLeft: '15%' }}
        />
            <br />
            <p className="justify-center items-center flex">
              We are excited to have you on board
            </p>
            <br />
            <br />
            <form className="max-w-md" onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border rounded"
                required
              />
              <div className="mb-4 flex relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-3 pr-10 border rounded"
                  required
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                  onClick={handleTogglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="text-gray-400 hover:text-gray-600"
                  />
                </span>
                <br />
              </div>
              {response && <p className="text-red-500 text-xs">{response}</p>}
              <br />
              <br />
              <button
                className="w-1/2 bg-blue-800 flex justify-center text-white p-3 rounded-full hover:bg-blue-700 text-xl font-bold mx-auto"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <br />
        <Footer />
      </div>
    </div>
  );
};

export default Login;