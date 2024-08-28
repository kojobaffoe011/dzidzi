import React from "react";
import { useNavigate } from "react-router";
import { useGetActiveUser } from "../../components/brokers/apicalls";

const WelcomePage = () => {
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

  setTimeout(() => {
    if (!activeUserLoading) {
      if (activeUser?.currentUserRole === "USER") {
        return navigateTo("/details");
      }
      return navigateTo("/dashboard");
    }
  }, 3000);

  return (
    <div className="p-16 flex items-center justify-center h-screen flex-col">
      {activeUserLoading ? (
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
