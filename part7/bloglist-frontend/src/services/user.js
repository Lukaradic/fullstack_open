import axios from 'axios';

const baseUrl = '/api/users';

const login = async ({ username, password }) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, { username, password });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const getUsers = async () => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export default { login, getUsers };
