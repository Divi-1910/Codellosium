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

export const executeCodeArena = async (problemId, language, input, type) => {
  try {
    console.log("Executing Code Arena");
    const response = await api.post("/", {
      problemId,
      language,
      type,
      input
    });
    return response.data;
  } catch (error) {
    console.log("Submission Error : ", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const getSubmissions = async (offset, limit) => {
  try {
    const response = await api.get("/", {
      params: { offset, limit },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.log("Error in Fetching All Submissions : ", error);
    throw error.response?.data || error;
  }
};
