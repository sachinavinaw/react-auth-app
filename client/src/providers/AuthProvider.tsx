import React, { FC, ReactNode } from "react";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import WebConfig from "../types/auth";

const fetchConfiguration = async (): Promise<WebConfig> => {
  const response = await axios.get("http://localhost:4000/web-config");
  return response.data;
};

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: authConfig, isError } = useQuery<WebConfig>({
    queryKey: ["configuration"],
    queryFn: fetchConfiguration,
    staleTime: Infinity,
  });

  if (isError) {
    return <div>Something went wrong!!</div>;
  }

  if (!authConfig) {
    return <div>Could not connect to serevr.</div>;
  }

  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
