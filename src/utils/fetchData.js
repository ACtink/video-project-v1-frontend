// // const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // function fetchData(url, options = {}) {
// //   return fetch(`${BASE_URL}${url}`, options)
// //     .then(async (response) => {
// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => null);
// //         const errorMessage =
// //           errorData?.message ||
// //           errorData?.error ||
// //           `HTTP error! status: ${response.status}`;
// //         throw new Error(errorMessage);
// //       }
// //       return response;
// //     })
// //     .catch((error) => {
// //       console.error("Fetching error:", error);
// //       throw error;
// //     });
// // }

// // export default fetchData;

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// function fetchData(url, options = {}) {
//   return fetch(`${BASE_URL}${url}`, options)
//     .then(async (response) => {
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null);
//         const errorMessage =
//           errorData?.message ||
//           errorData?.error ||
//           `HTTP error! status: ${response.status}`;
//         const error = new Error(errorMessage);
//         error.status = response.status; // ← attach status code
//         throw error;
//       }
//       return response;
//     })
//     .catch((error) => {
//       console.error("Fetching error:", error);
//       throw error;
//     });
// }

// export default fetchData;

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
        const error = new Error(errorMessage);
        error.status = response.status; // attach status so callers can check err.status
        throw error;
      }
      return response;
    })
    .catch((error) => {
      // Only log unexpected errors — 404s and other intentionally handled
      // status codes are the caller's responsibility to deal with silently
      if (!error.status || error.status >= 500) {
        console.error("Fetching error:", error);
      }
      throw error;
    });
}

export default fetchData;