import axios from "axios";
const API = axios.create({
  baseURL: `http://localhost:8080/php/coosport-api/api/`,
});

export default API;
