import { BASE_URL } from "../../../config";

export async function GET() {
  try {
    if (!BASE_URL) {
      return new Response('Base url not found', {
        status: 404,
        statusText: 'Failed'
      });
    }

    const response = await fetch(`${BASE_URL}/api/meter/`);
    const result = await response.json();
    console.log("result", result);
    
    if (!response.ok) {
      return new Response('Request failed', {
        status: response.status,
        statusText: response.statusText
      });
    }
    return new Response(JSON.stringify(result), {
      status: 200,
      statusText: 'Success'
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response('Internal server error', {
      status: 500,
      statusText: 'Failed'
    });
  }
}
