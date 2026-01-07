import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOG_IN } from "../gql/mutations";
import { useApolloClient } from "@apollo/client/react";
import { useNavigate } from "react-router";

export const UserLogin = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const [logInMutation, { loading }] = useMutation(LOG_IN);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await logInMutation({
      variables: {
        username: formData.username,
        password: formData.password,
      },
      onCompleted: async (data) => {
        const token = data?.login?.token;
        localStorage.setItem("access-token", token);
        await client.resetStore();
        navigate("/books");
      },
    });
  };
  return (
    <div>
      <h3>Log in</h3>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleFormChange}
            value={formData.username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleFormChange}
            value={formData.password}
          />
        </div>
        <button
          type="submit"
          onClick={handleFormSubmit}
          disabled={!formData.username | !formData.password | loading}
        >
          {loading ? "Loading..." : "Log in"}
        </button>
      </form>
    </div>
  );
};
