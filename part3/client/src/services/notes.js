import axios from "axios";
// const baseUrl = "https://fullstack-open-2108.onrender.com";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(`${baseUrl}`);
};

const create = (newPerson) => {
  const { name, number } = newPerson;
  return axios.post(`${baseUrl}`, {
    name,
    number,
  });
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deleteAction = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  create,
  update,
  delete: deleteAction,
};
