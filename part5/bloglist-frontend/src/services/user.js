import axios from "axios";

const baseUrl = "/api/users";

export const login = async ({ username, password }) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, { username, password });
    return res;
  } catch (error) {
    console.error(error);
  }
};
