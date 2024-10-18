import { useMutation } from "@tanstack/react-query";
import { useLogout } from "../components/brokers/apicalls";
import { showErrorToast } from "../toast/Toast";
import cookie from "../utils/cookie";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

export function useLogoutUser (){
      const {mutationFn} = useLogout()
      const {setAuth} = useAuth()
        const navigate = useNavigate();
        const navigateTo = (url) => {
    navigate(url);
  };

  const {mutate, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: mutationFn,
    onSuccess: ()=>{
      setAuth({});
    localStorage.removeItem("dzidzi");
    localStorage.removeItem("loginTime");
    cookie.clearCipher();
    navigateTo("/")
    },
    onError: (error)=>{
     showErrorToast(error.message)
    },
    



})

return {mutate, isPending}

}

