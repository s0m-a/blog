'use client'
import AxiosInstance from "@/lib/axios";
import { useUserStore } from "@/context/useUserStore";
import { useEffect } from 'react';

let refreshPromise = null;

export default function AuthInterceptor() {
  const { refreshToken, logout } = useUserStore();

  useEffect(() => {
    AxiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("AXIOS INTERCEPTOR HIT", error?.response?.status);
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            console.log("TRYING TO REFRESH TOKEN...");
            if (!refreshPromise) {
              refreshPromise = refreshToken(); // This will return a promise
              console.log(`refreshed promise: ${refreshPromise}`);
              await refreshPromise;
              refreshPromise = null;
            } else {
              // Wait for any ongoing refresh promise
              await refreshPromise;
            }
            console.log("TOKEN REFRESHED, RETRYING REQUEST");
            return AxiosInstance(originalRequest); // Retry original request with new token
          } catch (err) {
            console.error("REFRESH FAILED", err);
            logout(); // Handle logout if refresh fails
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );
  }, [refreshToken, logout]);

  return null;
}
