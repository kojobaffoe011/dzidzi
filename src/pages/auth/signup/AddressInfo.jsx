import { useNavigateTo } from "../../../hooks/useNavigateTo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Unauthorized from "../../../components/reusableComponents/Unauthorized";

const AddressInfo = () => {

    const signupInfo = localStorage.getItem('signup')
    const basicDetails = JSON.parse(signupInfo)

      const {navigateTo} = useNavigateTo()

        const userSchema = yup.object().shape({
            street: yup.string().required("Street is required"),
            houseNumber: yup.string().required("House number is required"),
            zip: yup.string().required("Zip is required"),
            city: yup.string().required("City is required"),
        })

        const {
            register,
            handleSubmit,
        } = useForm({
          resolver: yupResolver(userSchema),
        });

        const formSubmitHandler =(data)=> {
            localStorage.setItem('signup', JSON.stringify({
                ...basicDetails,
                address: {
                street: data.street,
                houseNumber: data.houseNumber,
                apartmentNr: "",
                zip: data.zip,
                city: data.city,
                floor: 0
                }, 
                addressCompleted: true
            }))
            navigateTo('/auth/register/login-info')
        }

        if(!basicDetails || !basicDetails?.basicCompleted){
         return  <Unauthorized link="/auth/register"/>
        }

  return (
    <div className='flex flex-col'>
        <div className='flex flex-col items-center gap-2'>
            <p className='font-bold text-4xl '>What is your full address?</p>
            <p className='font-light text-sm'>To get the best suggestions on restaurants enter your address</p>

            <form action="" className='flex flex-col w-full gap-6' onSubmit={handleSubmit(formSubmitHandler)}>
              <div className="flex flex-col gap-6 col-span-2 mt-4">
              <div className="grid grid-cols-3 gap-1">
                <div className="w-full flex flex-col gap-1 col-span-2 ">
                  
                   <label className="text-xs font-light text-gray-500">
                    Street Address
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                      {...register("street")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter address here"
                    name="street"
                
                    required
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                   <label className="text-xs font-light text-gray-500">
                    House Number
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                  {...register("houseNumber")}   
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter apt number here"
                    name="houseNumber"
                    
                    required
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-1">
                <div className="flex flex-col gap-1">
                   <label className="text-xs font-light text-gray-500">
                    City
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                   {...register("city")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter Apartment Number"
                    name="city"
                   
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-light text-gray-500">
                    Zip Code
                    <span className="text-red-600 text-lg ">*</span>
                    </label>
                  <input
                  {...register("zip")}
                    className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    placeholder="Enter Apartment Number"
                    name="zip"
                    required
                    type="number"
                  />
                </div>
              </div>
            </div>


               <div className=" mb-8 w-full flex">
              {" "}
                <button
                  className="mt-5 bg-blue-500 px-16 py-4 rounded disabled:bg-gray-200 w-full"
                  //   type="button"
                  // disabled={true}
                >
                  {/* {cardLoading ? (
                    <Spinner color="white" size="20px" />
                  ) : (
                    <p className="text-white text-sm">Finish</p>
                  )} */}
                  <p className='font-bold text-white'>Continue</p>
                </button>
            </div>
            </form>
        </div>
    

    </div>
  )
}

export default AddressInfo