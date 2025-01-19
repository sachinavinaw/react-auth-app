import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp: number; // Expiration time in seconds since the epoch
};

const useInactivityTimer = () => {
  const { getAccessTokenSilently, isAuthenticated, logout } = useAuth0();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // const warningTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  // const [inactivityTimeout, setInactivityTimeout] = useState<number | null>(
  //   null,
  // );
  const [sessionTimeLeft, setSessionTimeLeft] = useState<number | null>(null);

  // Function to reset the inactivity timer

  // Fetch the access token and calculate the timeout duration
  useEffect(() => {
    const fetchInactivityTimeout = async () => {
      try {
        const token = await getAccessTokenSilently();
        const decodedToken: DecodedToken = jwtDecode(token);

        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const timeoutDuration = (decodedToken.exp - currentTime) * 1000; // Convert to milliseconds
        console.log("Will expire at: ", decodedToken.exp);
        setSessionTimeLeft(timeoutDuration / 1000); // Initial session time left in seconds
        // Reset the timer with the new timeout

        // Set a timeout to log the user out when the session is about to expire
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          logout({
            logoutParams: { returnTo: window.location.origin },
          });
        }, timeoutDuration);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    if (isAuthenticated) {
      fetchInactivityTimeout();
    }
  }, [getAccessTokenSilently, isAuthenticated, logout]);

  // Update the session timer every second
  useEffect(() => {
    if (sessionTimeLeft !== null) {
      const interval = setInterval(() => {
        setSessionTimeLeft((prev) =>
          prev !== null && prev > 0 ? prev - 1 : 0,
        );

        if (sessionTimeLeft != null && sessionTimeLeft <= 30) {
          setShowWarning(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sessionTimeLeft]);

  // Attach event listeners to detect user activity only on page load or if sessionTimeLeft < 20 sec

  return { sessionTimeLeft, showWarning };
};

export default useInactivityTimer;
