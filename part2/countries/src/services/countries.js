import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = async (onError) => {
  const res = await axios.get(`${BASE_URL}/all`);
  return res.data;
};

const getByName = async (name) => {
  const res = await axios.get(`${BASE_URL}/name/${encodeURIComponent(name)}`);
  return res.data;
};

export default { getAll, getByName };
