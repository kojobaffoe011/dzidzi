import { Modal } from "../modal";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import Spinner from "../../loaders/Spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../reusableComponents/Button";
import { useEffect, useState } from "react";
import { useGetCouponsByCouponNumber } from "../../brokers/apicalls";
import PropTypes from "prop-types";

const PromoCode = (props) => {
  const [couponToCheck, setCouponToCheck] = useState(null);
  const { setcouponnumber, handlecancel } = props;
  const credentialSchema = yup.object().shape({
    promocode: yup.string().required("Promo Code is required"),
  });

  const { isLoading, isError, error, isSuccess } =
    useGetCouponsByCouponNumber(couponToCheck);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(credentialSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      setcouponnumber(couponToCheck);
      handlecancel();
      showSuccessToast("Coupon applied successfully");
    } else if (isError) {
      const { response } = error;
      if (response.data.error == "couponNotFound") {
        // refetch();
        setcouponnumber(null);
        reset();
        handlecancel();
        showErrorToast("Invalid coupon number");
      } else if (response.data.error == "couponAlreadyUsed") {
        reset();
        handlecancel();
        showErrorToast("You have already used this coupon");
      } else showErrorToast(error.message);
    }
  }, [couponToCheck, isSuccess, isError]);

  const handleCheckCoupon = (data) => {
    if (Object.keys(errors).length === 0) {
      // console.log({ errors });
      if (data.promocode.trim() == couponToCheck?.trim()) {
        reset();
        return handlecancel();
      }
      setCouponToCheck(data.promocode);
    }
  };

  return (
    // <div handlecancel={props.handlecancel} isOpen={props.isOpen}>
    <Modal {...props}>
      <div className="p-2 flex flex-col">
        <div className="p-2 flex flex-col pb-4">
          <div className="flex justify-center">
            <p className="font-bold">ADD PROMO CODE</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleCheckCoupon)}>
          <div className="flex flex-col mb-3 gap-1">
            <input
              className="border outline-none p-2 text-sm border border-black rounded-md"
              placeholder="promocode"
              name="promocode"
              {...register("promocode")}
              required
            />
          </div>

          <div className="flex justify-center">
            <div className="flex items-center mr-2">
              <Button className="px-8 py-2 w-full bg-black rounded-md">
                {isLoading ? (
                  <Spinner color="white" size="15px" />
                ) : (
                  <p className="font-bold text-sm text-white">Apply Promo</p>
                )}
              </Button>
            </div>
            <div className="flex items-center">
              <button
                className="px-8 py-2 w-full bg-gray-100 rounded border"
                type="button"
                onClick={handlecancel}
              >
                <p className="font-bold text-sm text-gray-500">Exit</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
    // {/* </div> */}
  );
};
// };

export default PromoCode;

PromoCode.propTypes = {
  setcouponnumber: PropTypes.func,
  handlecancel: PropTypes.func,
};
