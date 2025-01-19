import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import apiClient from "../libs/apiClient"; // Import global axios instance

const useAuthenticatedAxios = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use(
      async (config) => {
        try {
          const token = await getAccessTokenSilently();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
    };
  }, [getAccessTokenSilently]);

  return apiClient;
};

export default useAuthenticatedAxios;
