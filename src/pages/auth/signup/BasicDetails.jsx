import { resp } from '../../../utils/config'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigateTo } from '../../../hooks/useNavigateTo';
import CustomInput from '../../../components/CustomInput';

const BasicDetails = () => {
    const {navigateTo} = useNavigateTo()

        const userSchema = yup.object().shape({
            lastname: yup.string().required("Last Name is required"),
            firstname: yup.string().required("Other Names is required"),
            contact: yup.string().required("Contact"),
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
              <CustomInput register={register} name={"lastname"} label={'LASTNAME'} type={'text'} required={true} placeholder={'Agyemang'}/>

            </div>
            <div className={`flex flex-col gap-1 ${resp}`}>
              <CustomInput register={register} name={"firstname"} label={'FIRSTNAME'} type={'text'} required={true} placeholder={'Otojor Kwame'}/>
            </div>
            <div className={`flex flex-col gap-1 ${resp}`}>
            <CustomInput register={register} name={"contact"} label={'CONTACT'} type={'number'} required={true} placeholder={'017611671617'}/>
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