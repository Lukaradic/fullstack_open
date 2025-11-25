import axios from 'axios';

const baseUrl = '/api/users';

const login = async ({ username, password }) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, { username, password });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export default { login };
