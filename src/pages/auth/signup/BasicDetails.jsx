import { resp } from '../../../utils/config'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigateTo } from '../../../hooks/useNavigateTo';

const BasicDetails = () => {
    const {navigateTo} = useNavigateTo()

        const userSchema = yup.object().shape({
            lastname: yup.string().required("Last Name is required"),
            firstname: yup.string().required("Other Names is required"),
            contact: yup.string().required("Contact"),
            // street: yup.string().required("Street is required"),
            // houseNumber: yup.string().required("House number is required"),
            // zip: yup.string().required("Zip is required"),
            // city: yup.string().required("City is required"),
        })

        const {
            register,
            handleSubmit,
        } = useForm({
          resolver: yupResolver(userSchema),
        });

        const formSubmitHandler =(data)=> {
            localStorage.setItem('signup', JSON.stringify({basicCompleted: true, ...data}))
            navigateTo('/auth/register/address')
        }

  return ( 
    <div className='flex flex-col'>
        <div className='flex flex-col items-center gap-2' onSubmit={handleSubmit(formSubmitHandler)}>
            <p className='font-bold text-4xl '>Create a free account now!</p>
            <p className='font-light text-sm'>Start by entering your full name to continue</p>

            <form action="" className='flex flex-col w-full gap-6'>
            <div className={`flex flex-col gap-1 ${resp}`}>
              <label className="text-xs font-light text-gray-500">
                Last name
                <span className="text-red-600 text-lg ">*</span>
              </label>
              <input
                {...register("lastname")}
                name="lastname"
                className="rounded border border-gray-600 w-full p-4 outline-none text-sm placeholder:text-sm placeholder:text-gray-400"
                placeholder="Agyemang"
                required
              />
            </div>
            <div className={`flex flex-col gap-1 ${resp}`}>
               <label className="text-xs font-light text-gray-500">
                First names
                <span className="text-red-600 text-lg ">*</span>
              </label>
              <input
                {...register("firstname")}
                name="firstname"
                className="rounded border border-gray-600 w-full p-4 outline-none text-sm placeholder:text-sm placeholder:text-gray-400"
                placeholder="Otojor Kwame"
                required
              />
            </div>
            <div className={`flex flex-col gap-1 ${resp}`}>
               <label className="text-xs font-light text-gray-500">
                Contact
                <span className="text-red-600 text-lg ">*</span>
              </label>
              <input
                {...register("contact")}
                name="contact"
                className={`rounded border border-gray-600 w-full p-4 outline-none text-sm placeholder:text-sm placeholder:text-gray-400`}
                placeholder="01761178292"
                required
                type='number'

              />
            </div>


               <div className=" mb-8 w-full flex">
              {" "}
                <button
                  className="mt-5 bg-blue-500 px-16 py-4 rounded disabled:bg-gray-200 w-full"
                >
                  <p className='font-bold text-white'>Continue</p>
                </button>
            </div>
            </form>
        </div>
    

    </div>
  )
}

export default BasicDetails