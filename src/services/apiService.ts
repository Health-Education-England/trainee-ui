import axios, { AxiosResponse } from "axios";
import { Auth } from "aws-amplify";

export class ApiService {
  axiosInstance = axios.create({
    baseURL: "http://localhost:8203/",
    headers: {}
  });

  constructor() {
    this.axiosInstance.interceptors.request.use(async function(config) {
      let user = await Auth.currentAuthenticatedUser();
      const accessToken = user.signInUserSession.accessToken.jwtToken;
      config.headers.authorization = `Bearer ${accessToken}`;

      return config;
    });
  }

  get<T = any>(url: string): Promise<AxiosResponse<T>> {
    // Get the user id / email and pass it to the api.
    const userId = "5e00c7942749a84794644f83";

    return this.axiosInstance.get(`${url}/${userId}`);
  }
}

export default ApiService;
