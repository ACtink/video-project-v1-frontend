export const joinUser = async (payload) => {

  console.log("Joining user with payload:", payload);
  const response = await fetch(
    "http://localhost:3000/api/auth/join",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors[0] || "Request failed");
  }

  return data;
};



export const loginUser = async (payload) => {
  const response = await fetch(
    "http://localhost:3000/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 🔥 REQUIRED

      body: JSON.stringify(payload),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors[0] || "Login failed");
    
  }

  return data;
};
