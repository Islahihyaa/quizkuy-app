import axios from "axios";

export const useAuth = (type, url) => {
  const authHandler = async (formData) => {
    let endpoint = `${url}/user/${type}`;
    try {
      const response = await axios.post(endpoint, formData);
      if (response.status === 200) {
        if (type === "login") {
          localStorage.setItem("userData", JSON.stringify(response.data.data));
          localStorage.setItem("token", response.data.data.token);
        }
      } else {
        throw new Error(response);
      }
    } catch (error) {
      throw new Error(error.response.data.message || "An error occurred");
    }
  };

  return authHandler;
};
