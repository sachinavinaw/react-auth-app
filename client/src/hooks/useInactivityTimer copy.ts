import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number; // Expiration time in seconds since the epoch
}

const useInactivityTimer = () => {
  const { logout, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [inactivityTimeout, setInactivityTimeout] = useState<number | null>(
    null,
  );
  const [sessionTimeLeft, setSessionTimeLeft] = useState<number | null>(null);

  // Function to reset the inactivity timer
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);

    setShowWarning(false);

    if (inactivityTimeout !== null) {
      // Show warning 30 seconds before the timeout
      warningTimeoutRef.current = setTimeout(() => {
        setShowWarning(true);
      }, inactivityTimeout - 30000);

      // Log out the user after the timeout
      timerRef.current = setTimeout(() => {
        logout({
          logoutParams: { returnTo: window.location.origin },
        });
        navigate(window.location.origin);
      }, inactivityTimeout);
    }
  }, [inactivityTimeout, logout, navigate]);

  // Fetch the access token and calculate the timeout duration
  useEffect(() => {
    const fetchInactivityTimeout = async () => {
      try {
        const token = await getAccessTokenSilently();
        const decodedToken: DecodedToken = jwtDecode(token);

        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const timeoutDuration = (decodedToken.exp - currentTime) * 1000; // Convert to milliseconds

        setInactivityTimeout(timeoutDuration);
        setSessionTimeLeft(timeoutDuration / 1000); // Initial session time left in seconds
        resetTimer(); // Reset the timer with the new timeout
      } catch (error) {
        console.error("Error fetching access token:", error);
        logout({
          logoutParams: { returnTo: window.location.origin },
        });
        navigate(window.location.origin);
      }
    };

    fetchInactivityTimeout();
  }, [getAccessTokenSilently, logout, navigate, resetTimer]);

  // Update the session timer every second
  useEffect(() => {
    if (sessionTimeLeft !== null) {
      const interval = setInterval(() => {
        setSessionTimeLeft((prev) =>
          prev !== null && prev > 0 ? prev - 1 : 0,
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sessionTimeLeft]);

  // Attach event listeners to detect user activity only on page load or if sessionTimeLeft < 20 sec
  useEffect(() => {
    // Function to attach event listeners
    const handleActivity = () => resetTimer();
    const attachEventListeners = () => {
      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
    };

    // Attach event listeners on page load or if sessionTimeLeft < 20 sec
    if (sessionTimeLeft === null || sessionTimeLeft < 20) {
      attachEventListeners();
    }

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    };
  }, [resetTimer, sessionTimeLeft]); // Dependency on sessionTimeLeft to re-attach listeners if it's less than 20 sec

  return { resetTimer, showWarning, sessionTimeLeft };
};

export default useInactivityTimer;
