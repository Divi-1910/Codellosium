import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000",
  withCredentials: true
});

export const executeCode = async (code, language, input, type) => {
  try {
    const response = await api.post("/", { code, language, type, input });
    return response.data;
  } catch (error) {
    console.log("Submission Error : ", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
