export const getMeters = async () => {
  try {
    const response = await fetch(`/api/get-meter`, {
      method: "GET",
    });
    const result = await response.json();
    console.log(result);
   
    return result;
  } catch (error) {
    console.error("Error fetching meters:", error);
    return [];
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(`api/get-user`, {
      method: "GET",
    });
    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};


interface FormData {
  name: string;
  email: string;
  phonenumber: string;
  location: string;
  company_name: string;
  password: string;
  username:string
}

export const registerUser = async (FormData:any) => {
  const url = '/api/create-user';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FormData),
    });
    console.log('Response:', response);
  
    if (response.ok) {
      const data = await response.json();
      console.log('Success:', data);
      return data;
    } else {
      const errorData = await response.json();
      console.log('Error:', errorData);
      throw new Error(errorData.message || "Failed to add a user");
    }
  } catch (error) {
    console.error('Catch Error:', error);
    throw new Error(error.message || "Failed to add a user");
  }
}  



export const loginUser = async (user: any) => {
const url= '/api/login-user'
try { 

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.status === 200) {
    const result = await response.json();
    return {
      success: true,
      data: result,
    };
  } else {
    const errorData = await response.json();
    return {
      success: false,
      message: errorData.error || "Login failed",
    };
  }
} catch (error: any) {
  return {
    success: false,
    message: error.message || "Internal server error",
  };
}
};