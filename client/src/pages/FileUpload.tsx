import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const FileUpload = () => {
  const { isAuthenticated, logout } = useAuth0();

  if (!isAuthenticated) {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  return <div>File Upload Page</div>;
};

export default FileUpload;
