import axios, { InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

type JwtPayload = { exp: number };

function isTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string | null) {
  refreshSubscribers.forEach((cb) => {
    if (token) cb(token);
  });
  refreshSubscribers = [];
}

// Request interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let token = localStorage.getItem("accessToken");

    if (token && isTokenExpired(token)) {
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = localStorage.getItem("refreshToken");

        try {
          const { data } = await axios.post(
            `${backendURL}/api/auth/refresh`,
            { refreshToken },
            { withCredentials: true }
          );

          localStorage.setItem("accessToken", data.accessToken);
          token = data.accessToken;

          isRefreshing = false;
          onRefreshed(token);
        } catch (err) {
          isRefreshing = false;
          localStorage.removeItem("accessToken");
          console.error("Refresh token failed, logging out user.");
          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${newToken}`;
          }
          resolve(config);
        });
      });
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
