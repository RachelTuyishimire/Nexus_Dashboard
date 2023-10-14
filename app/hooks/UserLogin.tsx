export const loginUser = async (user: any) => {
    const url= 'api/login-user'
    try {
      if (!url) {
        return {
          success: false,
          message: "Base URL not found",
        };
      }
    
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