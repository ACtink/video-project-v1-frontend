const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function fetchData(url, options = {}) {
  return fetch(`${BASE_URL}${url}`, options)
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.message ||
          errorData?.error ||
          `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }
      return response;
    })
    .catch((error) => {
      console.error("Fetching error:", error);
      throw error;
    });
}

export default fetchData;