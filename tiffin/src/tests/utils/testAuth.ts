import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
const { PORT } = process.env;
axios.defaults.baseURL = `http://localhost:${PORT}`;
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

export async function getAccessToken(): Promise<string> {
  const response = await axios.post<string>("/api/auth/signin", {
    email: "tarou@example.com",
    password: "password",
  });

  return response.data;
}
