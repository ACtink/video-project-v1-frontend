


const BASE_URL = import.meta.env.VITE_API_BASE_URL;


function fetchData(url, options = {}) {
  return fetch(`${BASE_URL}${url}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    })
    .catch((error) => {
      console.error("Fetching error:", error);
      throw error;
    });
}

export default fetchData;   