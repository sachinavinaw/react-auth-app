import Navbar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { FC, ReactNode } from "react";
import RedirectPage from "../RedirectPage";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
  }

  if (isAuthenticated) {
    return (
      <div>
        <Navbar />

        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          {children}
        </div>
      </div>
    );
  }

  return <RedirectPage />;
};

export default Layout;
