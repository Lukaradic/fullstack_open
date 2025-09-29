import axios from "axios";
const baseUrl = "https://fullstack-open-2108.onrender.com";

const getAll = () => {
  return axios.get(`${baseUrl}/api/persons`);
};

const create = (newPerson) => {
  const { name, number } = newPerson;
  return axios.post(`${baseUrl}/api/persons`, {
    name,
    number,
  });
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deleteAction = (id) => {
  return axios.delete(`${baseUrl}/api/persons/${id}`);
};

export default {
  getAll,
  create,
  update,
  delete: deleteAction,
};
