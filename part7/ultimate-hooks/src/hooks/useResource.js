import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useResource = (baseUrl) => {
  //  fetch the data
  //  expose method to  create

  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(baseUrl);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchData();
  }, [baseUrl, fetchData]);

  const createResource = async (resource) => {
    try {
      const res = await axios.post(baseUrl, resource);
      if (res.status === 201) {
        setData(data.concat(res.data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  //  returns array with 2 elements
  //  first is data
  //  second is the service
  return [data, { create: createResource }];
};
