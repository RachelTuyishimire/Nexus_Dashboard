import { useState } from "react";
import { registerUser } from "../utilities/utils";

interface FormData {
  name: string;
  email: string;
  phonenumber: string;
  location: string;
  company_name: string;
  password: string;
  username: string;
}

const UserRegistration = () => {
  const userData: FormData = {
    name: "",
    email: "",
    phonenumber: "",
    location: "",
    company_name: "",
    password: "",
    username: "",
  };

  const [formData, setFormData] = useState(userData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Form Data:', formData);
      const response = await registerUser(formData);
      console.log('Response:', response);
  
      if (response.status === 201) {
      } else if (response.status === 400) {
        const error = await response.json();
        console.log('Validation Error:', error);
        setErrors(error);
      } else {
        const errorMessage = "An error occurred during registration. Please try again later.";
        console.log('General Error:', errorMessage);
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
    }
  };
  

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
  };
};

export default UserRegistration;
