import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6001",
  withCredentials: true
});

export const getProblems = async () => {
  try {
    const response = await api.get("/", {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.log("Problem Error : ", error);
    throw error.response?.data || error;
  }
};
