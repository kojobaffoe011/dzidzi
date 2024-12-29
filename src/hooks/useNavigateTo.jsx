import { useNavigate } from "react-router";

export const useNavigateTo = () => {
  const navigate = useNavigate();
  const navigateTo = (url) => navigate(url);

  return { navigateTo };
};
