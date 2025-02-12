import axios from "axios";

const gatewayapi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
});

export default gatewayapi;
