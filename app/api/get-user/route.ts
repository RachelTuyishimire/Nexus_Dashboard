import { BASE_URL } from "../../../config";
export async function GET() {
  try {
    if (!BASE_URL) {
      return new Response("Base url not found", {
        status: 404,
        statusText: "Failed",
      });
    }
    const response = await fetch(`${BASE_URL}/customer/customers/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return new Response("Request failed", {
        status: response.status,
        statusText: response.statusText,
      });
    }
    const userData = await response.json();

    return new Response(JSON.stringify(userData), {
      status: 200,
      statusText: "Success",
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new Response("Internal server error", {
      status: 500,
      statusText: "Failed",
    });
  }
};
