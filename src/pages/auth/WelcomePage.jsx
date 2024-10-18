import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  useGetActiveUser,
  useGetActiveUserDetails,
} from "../../components/brokers/apicalls";
import useAuth from "../../hooks/useAuth";

const WelcomePage = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const navigateTo = (url) => {
    navigate(url);
  };

  const {
    data: activeUser,
    isLoading: activeUserLoading,
    isError: isActiveUserError,
    error: activeUserError,
  } = useGetActiveUser();

  const {
    data: activeUserDetails,
    isLoading: activeUserDetailsLoading,
    isError: isActiveUserDetailsError,
    error: activeUserDetailsError,
  } = useGetActiveUserDetails(activeUser?.currentUserId);

  setTimeout(() => {
    if (!activeUserLoading) {
      if (activeUser?.currentUserRole == "USER") {
        if (auth?.orders && auth?.restaurant) {
          return navigateTo(`/details/checkout/${auth?.restaurant?.id}`);
        }
        return navigateTo("/details");
      }
      return navigateTo("/dashboard");
    }
  }, 3000);

  useEffect(() => {
    setAuth({
      ...auth,
      userCredentials: { ...auth?.userCredentials, activeUserDetails },
    });
  }, [auth, activeUserDetails, setAuth ]);

  return (
    <div className="p-16 flex items-center justify-center h-screen flex-col">
      {activeUserLoading || activeUserDetailsLoading ? (
        <>
          <p className="font-logo font-extrabold text-6xl animate-bounce">
            dzidzi
          </p>
          <p className="animate-bounce text-sm text-gray-400">
            Where food lives
          </p>
        </>
      ) : (
        <>
          <p className="font-logo font-extrabold text-6xl animate-bounce">
            dzidzi
          </p>
          <p className="animate-bounce text-sm text-gray-400">
            Where food lives
          </p>
        </>
      )}
    </div>
  );
};

export default WelcomePage;
