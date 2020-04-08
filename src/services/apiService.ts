import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Auth } from "aws-amplify";

export class ApiService {
  axiosInstance: AxiosInstance;
  traineeTisId = 123;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_ADDRESS,
      headers: {}
    });

    this.axiosInstance.interceptors.request.use(async function(config) {
      let user = await Auth.currentAuthenticatedUser();
      config.headers.authorization = `Bearer ${user.signInUserSession.accessToken.jwtToken}`;

      return config;
    });
  }

  get<T = any>(url: string): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get(url);
  }

  post<T = any>(url: string, formData: T): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post(url, formData);
  }
}

export default ApiService;
