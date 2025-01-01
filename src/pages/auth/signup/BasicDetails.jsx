import { resp } from "../../../utils/config";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigateTo } from "../../../hooks/useNavigateTo";
import CustomInput from "../../../components/reusableComponents/CustomInput";
import Button from "../../../components/reusableComponents/Button";
import { useLocation } from "react-router";

const BasicDetails = () => {
  const { navigateTo } = useNavigateTo();
  const { pathname, search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const verifyParam = queryParams.get("verificationcode"); // Get the value of "verificationcode"
  const verificationCode = verifyParam ? verifyParam.replace(/ /g, "+") : "";

  const userSchema = yup.object().shape({
    lastname: yup.string().required("Last Name is required"),
    firstname: yup.string().required("Other Names is required"),
    contact: yup.string().required("Contact is required"),
  });

  const restaurantSchema = yup.object().shape({
    name: yup.string().required("Restaurant Name is required"),
    // firstname: yup.string().required("Other Names is required"),
    contact: yup.string().required("Contact is required"),
    bio: yup.string().required("Bio is required"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(
      pathname.includes("restaurant") ? restaurantSchema : userSchema
    ),
  });

  const navigateLink = () => {
    let link = "/auth/register/address";
    if (pathname.includes("restaurant")) {
      link = `/auth/register/restaurant/address?verificationcode=${verificationCode}`;
    } else if (pathname.includes("courier")) {
      link = `/auth/register/courier/address?verificationcode=${verificationCode}`;
    } else link = "/auth/register/address";

    return link;
  };

  const formSubmitHandler = (data) => {
    localStorage.setItem(
      "signup",
      JSON.stringify({ basicCompleted: true, ...data })
    );
    navigateTo(navigateLink());
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col items-center gap-2"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <p className="font-bold text-4xl ">Create a free account now!</p>
        <p className="font-light text-sm">
          Start by entering your full name to continue
        </p>

        <form action="" className="flex flex-col w-full gap-6">
          {pathname.includes("restaurant") ? (
            <div className={`flex flex-col gap-1 ${resp}`}>
              <CustomInput
                register={register}
                name={"name"}
                label={"RESTAURANT NAME"}
                type={"text"}
                required={true}
                placeholder={"My Lovely Restaurant"}
              />
            </div>
          ) : (
            <>
              <div className={`flex flex-col gap-1 ${resp}`}>
                <CustomInput
                  register={register}
                  name={"lastname"}
                  label={"LASTNAME"}
                  type={"text"}
                  required={true}
                  placeholder={"Agyemang"}
                />
              </div>
              <div className={`flex flex-col gap-1 ${resp}`}>
                <CustomInput
                  register={register}
                  name={"firstname"}
                  label={"FIRSTNAME"}
                  type={"text"}
                  required={true}
                  placeholder={"Otojor Kwame"}
                />
              </div>
            </>
          )}

          <div className={`flex flex-col gap-1 ${resp}`}>
            <CustomInput
              register={register}
              name={"contact"}
              label={"CONTACT"}
              type={"number"}
              required={true}
              placeholder={"017611671617"}
            />
          </div>

          {pathname.includes("restaurant") && (
            <div className={`flex flex-col gap-1 ${resp}`}>
              <CustomInput
                register={register}
                name={"bio"}
                label={"BIO"}
                type={"textarea"}
                required={true}
                placeholder={"Enter bio here"}
                height={"h-[200px]"}
              />
            </div>
          )}

          <div className=" mb-8 w-full flex">
            {" "}
            <Button
              className="mt-5 px-16 py-4 rounded w-full"
              variant="primary"
            >
              <p className="font-bold text-white">Continue</p>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicDetails;
