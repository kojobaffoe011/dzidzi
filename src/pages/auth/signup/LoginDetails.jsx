import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import * as yup from "yup";
import { showErrorToast } from "../../../toast/Toast";
import Spinner from "../../../components/loaders/Spinner";
import { useNavigateTo } from "../../../hooks/useNavigateTo";
import Unauthorized from "../../../components/reusableComponents/Unauthorized";


const LoginDetails = () => {
  const {navigateTo} = useNavigateTo()
  const [showPass, setShowPass] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dataLoading, setDataLoading]  = useState(false)
  const userDetails = localStorage.getItem('signup')
  const parsedUserDetails = JSON.parse(userDetails)

   

  const handleFocus = () => {
    setIsFocused(true);
  };


  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTogglePass = () => {
    setShowPass(!showPass);
  };

    const userSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    username: yup
      .string()
      .required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.%^()_#+=*?&-])[A-Za-z\d@$!%.%^()_#+=*?&-]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
    repeatpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    // agreeBox: yup.boolean().oneOf([true], "Please tick checkbox"),
  });

    const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(userSchema),
  });


  const password = watch("password");

  const passReq = [
    {
      text: "Must be at least 8 characters long",
      isSatisfied: password?.length >= 8,
    },
    {
      text: "Must contain a lowercase character",
      isSatisfied: /[a-z]/.test(password),
    },
    {
      text: "Must contain an uppercase character",
      isSatisfied: /[A-Z]/.test(password),
    },
    {
      text: "Must contain a symbol - @$!%.%^()_#+=*?&-",
      isSatisfied: /[@$!%.%^()_#+=*?&-]/.test(password),
    },
  ];

   const { mutate, isPending } = useMutation({
    mutationKey: ["checkEmail", userData?.email],
    mutationFn: async (data) => {
      const response = await axios.post(`/user/exist?email=${encodeURIComponent(userData?.email)}`, data);
      return response?.data;
    },
    onSuccess: async (data) => {
      setDataLoading(false)
     if(data == false){
       await mutateAsync({
              firstName: parsedUserDetails.firstname,
              lastName: parsedUserDetails.lastname,
              contact: parsedUserDetails.contact,
              address: {
               street: parsedUserDetails.address.street,
               houseNumber: parsedUserDetails.address.houseNumber,
               apartmentNr:'',
               zip: parsedUserDetails.address.zip,
               city: parsedUserDetails.address.city,
               floor: 0
             },
              email: userData.email,
              password: userData.password,
              username: userData.username,
              provider: "LOCAL"
    });
    return
     }else throw Error ('User already exists')

    },
    onError: (error) => {
      console.log(error);
      showErrorToast(error.message);
    },
  });

    const {mutateAsync, isPending: creatingUserPending} = useMutation({
    mutationKey: ['createUser'],
    mutationFn:   async (paymentData) => {
      const response = await axios.post('user/sign-up', paymentData);
      return response.data;
    },
    onSuccess: () => {
        // Handle success, navigate to success page
        localStorage.removeItem('signup')
        navigateTo('/auth/register/success')
      },
    onError: (error) => {
        if(error?.response?.data.error == "usernameExists"){
          return showErrorToast('Username already taken')
        }
        showErrorToast(error.message)
      },

  })


  const formSubmitHandler = async (data)=> {
    if(Object.keys(errors))
      setDataLoading(true)
      await setUserData(data)
      setTimeout( 
        mutate({}),
        1000)
     
  }


     if(!userDetails || !parsedUserDetails?.basicCompleted || !parsedUserDetails?.addressCompleted){
         return  <Unauthorized link="/auth/register/address"/>
        }


  return (
    <div className='flex flex-col'>
        <div className='flex flex-col items-center gap-2'>
            <p className='font-bold text-4xl '>Almost Done!</p>
            <p className='font-light text-sm'>Enter the following details to finish your sign up</p>

            <form action="" className='flex flex-col w-full gap-6' onSubmit={handleSubmit(formSubmitHandler)}>
              <div className="flex flex-col gap-6 col-span-2 mt-4">
              <div className="grid grid-cols-3 gap-1">
                <div className="w-full flex flex-col gap-1 col-span-2 ">
                  
                   <label className="text-xs font-light text-gray-500">
                    Email
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                   {...register("email")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter email here"
                    name="email"
                    required
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                   <label className="text-xs font-light text-gray-500">
                    Username
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                   {...register("username")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter username here"
                    name="username"
                    required
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-1">
                <div className="flex flex-col gap-1 relative">
                   <label className="text-xs font-light text-gray-500">
                    Password
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter password here"
                    {...register("password")}
                    name="password"
                    type={showPass ? "text" : "password"}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                   <div className="cursor-pointer">
                {showPass ? (
                  <AiOutlineEye
                    className="absolute right-5 top-[52px]"
                    style={{ color: "#6b7280 " }}
                    size="15px"
                    onClick={() => {
                      handleTogglePass();
                      setIsFocused(true);
                    }}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-5 top-[52px]"
                    style={{ color: "#6b7280 " }}
                    size="15px"
                    onClick={() => {
                      handleTogglePass();
                      setIsFocused(true);
                    }}
                  />
                )}
              </div>
                {isFocused && (
                <div className="flex flex-col mt-1">
                  {passReq.map((item, idx) => {
                    return (
                      <div className="flex" key={idx}>
                        {item?.isSatisfied ? (
                          <IoCheckmarkCircle className="text-green-600" />
                        ) : (
                          <IoCloseCircle className="text-red-600" />
                        )}
                        <p
                          className={`text-xs ${
                            item?.isSatisfied
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
                </div>

                <div className="flex flex-col gap-1 relative">
                  <label className="text-xs font-light text-gray-500">
                    Repeat Password
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                   {...register("repeatpassword")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter password again"
                    name="repeatpassword"
                    required
                    type={showPass ? "text" : "password"}
                  />
                  {showPass ? (
                  <AiOutlineEye
                    className="absolute right-5 top-[52px]"
                    style={{ color: "#6b7280 " }}
                    size="15px"
                    onClick={() => {
                      handleTogglePass();
                      setIsFocused(true);
                    }}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-5 top-[52px]"
                    style={{ color: "#6b7280 " }}
                    size="15px"
                    onClick={() => {
                      handleTogglePass();
                      setIsFocused(true);
                    }}
                  />
                )}
                </div>
              </div>
            </div>


               <div className=" mb-8 w-full flex">
              {" "}
                <button
                  className="mt-5 bg-blue-500 px-16 py-4 rounded disabled:bg-gray-200 w-full"
                  disabled={isPending || creatingUserPending || dataLoading}
                >
                  {(isPending || creatingUserPending || dataLoading )? (
                    <Spinner color="white" size="20px" />
                  ) : (
                    // <p className="text-white text-sm">Finish</p>
                     <p className='font-bold text-white'>Finish</p>
                  )}
                 
                </button>
            </div>
            </form>
        </div>
    

    </div>
  )
}


export default LoginDetails