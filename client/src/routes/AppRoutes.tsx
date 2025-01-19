import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../pages/layout";
import AgreementPage from "../pages/AgreementPage";
import Faq from "../pages/Faq";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const ProtectedRoute = ({ component }: { component: React.ComponentType }) => {
  const { isAuthenticated } = useAuth0();

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Loading...</div>, // Optional loading screen
  });

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute component={Layout} />}>
        <Route path="/" element={<AgreementPage />} />
      </Route>
      <Route path="/faq" element={<Faq />} />
    </Routes>
  );
};

export default AppRoutes;
