import { useNavigateTo } from "../../../hooks/useNavigateTo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Unauthorized from "../../../components/reusableComponents/Unauthorized";
import CustomInput from "../../../components/reusableComponents/CustomInput";
import Button from "../../../components/reusableComponents/Button";
import { useLocation } from "react-router";

const AddressInfo = () => {
  const { pathname, search } = useLocation();

  const signupInfo = localStorage.getItem("signup");
  const basicDetails = JSON.parse(signupInfo);

  const { navigateTo } = useNavigateTo();

  const queryParams = new URLSearchParams(search);
  const verifyParam = queryParams.get("verificationcode"); // Get the value of "verificationcode"
  const verificationCode = verifyParam ? verifyParam.replace(/ /g, "+") : "";

  const navigateLink = () => {
    let link = "/auth/register/login-info";
    if (pathname.includes("restaurant")) {
      link = `/auth/register/restaurant/login-info?verificationcode=${verificationCode}`;
    } else if (pathname.includes("courier")) {
      link = `/auth/register/courier/login-info?verificationcode=${verificationCode}`;
    } else link = "/auth/register/login-info";

    return link;
  };

  const userSchema = yup.object().shape({
    street: yup.string().required("Street is required"),
    houseNumber: yup.string().required("House number is required"),
    zip: yup.string().required("Zip is required"),
    city: yup.string().required("City is required"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(userSchema),
  });

  const formSubmitHandler = (data) => {
    localStorage.setItem(
      "signup",
      JSON.stringify({
        ...basicDetails,
        address: {
          street: data.street,
          houseNumber: data.houseNumber,
          apartmentNr: "",
          zip: data.zip,
          city: data.city,
          floor: 0,
        },
        addressCompleted: true,
      })
    );
    navigateTo(navigateLink());
  };

  if (!basicDetails || !basicDetails?.basicCompleted) {
    return <Unauthorized link="/auth/register" />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-2">
        <p className="font-bold text-4xl ">What is your full address?</p>
        <p className="font-light text-sm">
          To get the best suggestions on restaurants enter your address
        </p>

        <form
          action=""
          className="flex flex-col w-full gap-6"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <div className="flex flex-col gap-6 col-span-2 mt-4">
            <div className="grid grid-cols-3 gap-1">
              <div className="w-full flex flex-col gap-1 col-span-2 ">
                <CustomInput
                  register={register}
                  name={"street"}
                  label={"STREET ADDRESS"}
                  type={"text"}
                  required={true}
                  placeholder={"Enter address here"}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <CustomInput
                  register={register}
                  name={"houseNumber"}
                  label={"HOUSE NUMBER"}
                  type={"text"}
                  required={true}
                  placeholder={"Enter apt number here"}
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-1">
              <div className="flex flex-col gap-1">
                <CustomInput
                  register={register}
                  name={"city"}
                  label={"CITY"}
                  type={"text"}
                  required={true}
                  placeholder={"Enter city here"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <CustomInput
                  register={register}
                  name={"zip"}
                  label={"ZIP CODE"}
                  type={"number"}
                  required={true}
                  placeholder={"Enter zip code here"}
                />
              </div>
            </div>
          </div>

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

export default AddressInfo;
