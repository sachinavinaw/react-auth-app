import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import AgreementPage from "./pages/AgreementPage";
import Loader from "./components/Loader/Loader";
import Error from "./pages/ErrorPage";
import Layout from "./pages/layout";
import ExitPage from "./pages/ExitPage";
import NotFoundPage from "./pages/NotFoundPage";
import Faq from "./pages/Faq";
import FileUpload from "./pages/FileUpload";

const ProtectedAgreementPage = withAuthenticationRequired(AgreementPage);
const ProtectedFileUploadPage = withAuthenticationRequired(FileUpload);

function App() {
  const { isLoading, error } = useAuth0();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Function to check token expiration
  //   const checkTokenExpiration = async () => {
  //     try {
  //       // Try to get the access token silently
  //       const accessToken = await getAccessTokenSilently();
  //       console.log(JSON.parse(accessToken));
  //     } catch (e) {
  //       // If an error occurs, the token has likely expired
  //       console.log("Token expired or invalid", e);
  //       // If token expired or not available, log the user out
  //       logout({ logoutParams: { returnTo: window.location.origin } });
  //       navigate("/"); // Redirect to login page
  //     }
  //   };

  //   // Check token expiration on page load
  //   checkTokenExpiration();

  //   // Check token expiration on route change
  //   const handleRouteChange = () => checkTokenExpiration();
  //   window.addEventListener("popstate", handleRouteChange);

  //   return () => {
  //     window.removeEventListener("popstate", handleRouteChange);
  //   };
  // }, [getAccessTokenSilently, logout, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {error && <Error message={error.message} />}

      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <ProtectedAgreementPage />
            </Layout>
          }
        />
        <Route
          path="/file-upload"
          element={
            <Layout>
              <ProtectedFileUploadPage />
            </Layout>
          }
        />

        <Route path="/exit" element={<ExitPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
