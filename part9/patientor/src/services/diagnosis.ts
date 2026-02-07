import axios from "axios";

export const getByCode = async (code: string) => {
  const data = await axios.get(`http://localhost:3001/api/diagnosis/${code}`);
  return data.data;
};
