import { useOutletContext } from "react-router";
import UserProfileDetails from "../../../components/reusableComponents/UserProfileDetails";
import TwoFALogic from "../../../components/reusableComponents/TwoFALogic";

const EditPassword = () => {
  return (
    <div className="flex flex-col gap-1 ">
      <p className="font-bold text-xl">Edit Password</p>
      <form action="" className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-6 col-span-2">
          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-col gap-1 col-span-2 ">
              <label className="text-xs font-light text-gray-500">
                Old Password
                <span className="text-red-600 text-lg ">*</span>
              </label>
              <input
                //  {...register("email")}
                className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                placeholder="Enter old password here"
                name="oldpassword"
                required
                type="password"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs font-light text-gray-500">
                New Password
                <span className="text-red-600 text-lg ">*</span>
              </label>
              <input
                //  {...register("username")}
                className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                placeholder="Enter your new password here"
                name="newpassword"
                required
                type="password"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs font-light text-gray-500">
                Repeat New Password
                <span className="text-red-600 text-lg ">*</span>
              </label>
              <input
                //  {...register("username")}
                className="border outline-none p-4 text-sm border border-black w-full rounded placeholder:text-xs"
                placeholder="Repeat password"
                name="repeatpass"
                required
                type="password"
              />
            </div>
          </div>

          <div className=" mb-8 w-full flex">
            {" "}
            <button
              className="mt-5 bg-blue-500 px-16 py-4 rounded disabled:bg-gray-200 w-full"
              // disabled={isPending || creatingUserPending || dataLoading}
            >
              {/* {(isPending || creatingUserPending || dataLoading )? (
                    <Spinner color="white" size="20px" />
                  ) : (
                    // <p className="text-white text-sm">Finish</p> */}
              <p className="font-bold text-white">Finish</p>
              {/* )} */}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const EditAddress = () => {
  return (
    <div className="col-span-2 gap-1 flex flex-col">
      <p className="font-bold text-xl">Edit Address</p>
      <form action="" className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-2 col-span-2">
          <div className="grid grid-cols-3 gap-1">
            <div className="w-full flex flex-col gap-1 col-span-2 ">
              <label className="text-xs font-light text-gray-500">
                Street Address
                <span className="text-red-600 text-lg ">*</span>
              </label>
              <input
                // {...register("street")}s
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
                // {...register("houseNumber")}
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
                //  {...register("city")}
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
                // {...register("zip")}
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
          <button className="mt-5 bg-blue-500 px-16 py-4 rounded disabled:bg-gray-200 w-full">
            <p className="font-bold text-white">Finish</p>
          </button>
        </div>
      </form>
    </div>
  );
};

const General = () => {
  const [data] = useOutletContext();
  return (
    <div>
      <UserProfileDetails data={data} />
      <div className="grid grid-cols-4 mt-4 gap-4">
        <EditPassword />
        <EditAddress />
        <TwoFALogic username={data?.credential?.username} />
      </div>
    </div>
  );
};

export default General;
