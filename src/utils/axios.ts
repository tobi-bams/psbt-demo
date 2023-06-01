import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function remoteCall(
  method: string,
  parameter?: any
): Promise<{ result: any; error: any }> {
  const USER = process.env.RPC_USER;
  const PASS = process.env.RPC_PASSWORD;
  const PORT = process.env.RPC_PORT;
  const IP = process.env.RPC_URL;

  const RPC_URL = `${IP}:${PORT}/`;
  const body = {
    jsonrpc: "1.0",
    id: "curltext",
    method: method,
    params: parameter,
  };

  if (USER && PASS) {
    try {
      const response = await axios.post(RPC_URL, JSON.stringify(body), {
        auth: {
          username: USER,
          password: PASS,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  } else {
    return { result: null, error: "Please provide username and password" };
  }
}
