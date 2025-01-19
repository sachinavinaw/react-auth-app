import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ErrorPage from "./pages/ErrorPage";
import Loader from "./components/Loader/Loader";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithRedirectCallback from "./providers/Auth0ProviderWithRedirectCallback";
import App from "./App";

// Query client instance
const queryClientProvider = new QueryClient();

// AppInitializer Component
const AppInitializer: React.FC = () => {
  const [config, setConfig] = useState<{
    domain: string;
    clientId: string;
    audience: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch("http://localhost:4000/web-config");
        if (!response.ok) {
          throw new Error(`Failed to fetch config: ${response.statusText}`);
        }
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    }

    fetchConfig();
  }, []);

  if (error) {
    return <ErrorPage message={error} />;
  }

  if (!config) {
    return <Loader />;
  }

  const { domain, clientId, audience } = config;

  return (
    <QueryClientProvider client={queryClientProvider}>
      <BrowserRouter>
        <Auth0ProviderWithRedirectCallback
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            audience: audience,
            scope: "profile email read:users",
            redirect_uri: window.location.origin,
          }}
        >
          <App />
        </Auth0ProviderWithRedirectCallback>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppInitializer;
