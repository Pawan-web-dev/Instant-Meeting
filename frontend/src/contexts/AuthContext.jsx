import { createContext, useContext, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";



export const AuthContext = createContext({});
const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/v1/users`,
  withCredentials: true

});

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const router = useNavigate();
  const [userData, setUserData] = useState(authContext);

  const handleRegister = async (name, username, password) => {
    try {
      let request = await client.post("/register", {
        name: name,
        username: username,
        password: password,
      });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (e) {
      throw e;
    }
  };
  const handleLogin = async (username, password) => {
    try {
      let request = await client.post("/login", { username: username, password: password });
  
      if (request && request.data && request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        router("/home");
      } else {
        console.error("Unexpected response format", request);
      }
    } catch (e) {
      console.error("Login error:", e.response ? e.response.data : e);
      throw e;
    }
  };
  
  // const handleLogin = async (username, password) => {
  //   try {
  //     let request = await client.post("/login", {
  //       username: username,
  //       password: password,
  //     });
  //     // console.log("data", request)
  //     if (request.status === httpStatus.OK) {
  //       localStorage.setItem("token", request.data.token); //storing token in client
  //       router("/home");
  //     }
  //   } catch (e) {
  //     throw e;
  //   }
  // };

  const getHistoryOfUser = async () => {
    try {
      let request = await client.get("/get-all-activity", {
        params: {
          token: localStorage.getItem("token"),
        },
      });
      return request.data;
    } catch (err) {
      throw err;
    }
  };

  const addToUserHistory = async (meetingCode) => {
    try {
      let request = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meetingCode,
      });
      return request;
    } catch (e) {
      throw e;
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    getHistoryOfUser,
    addToUserHistory,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
