import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (data) => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.post(baseUrl, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

const like = async (data) => {
  try {
    const res = await axios.put(`${baseUrl}/${data.id}`, {
      ...data,
      user: data.user.id,
    });

    return res;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteBlog = async (id) => {
  try {
    const token = localStorage.getItem("userToken");
    await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};
export default { getAll, create, like, deleteBlog };
