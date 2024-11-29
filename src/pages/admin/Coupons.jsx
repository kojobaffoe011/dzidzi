import { useCallback, useState } from "react";
import {
  useGetCoupons,
} from "../../components/brokers/apicalls";
import Button from "../../components/Button";
import AddCoupon from "../../components/modal/restaurant/AddCoupon";
import Couriers from "./Couriers";
import { useOutletContext } from "react-router";

const Coupons = () => {
  const [credentialOpen, setCredentialsOpen] = useState(false);
  const [, activeUser] = useOutletContext()
 
  const handleOpenInvoiceModal = useCallback(() => {
    setCredentialsOpen(true);
  }, []);
  const handleCloseInvoiceModal = useCallback(() => {
    setCredentialsOpen(false);
  }, []);

  const {
    data: coupons,
    isLoading: couponsLoading,
    isError: couponsError,
    error: isServicesError,
  } = useGetCoupons(activeUser);



  return (
    <>
      <AddCoupon
        isOpen={credentialOpen}
        handleCancel={handleCloseInvoiceModal}
        userRole={"RESTAURANT_ADMIN"}
        width="400px"
      />
      <div className="flex flex-col mt-4">
        <div className="justify-end flex">
          <Button
            variant="primary"
            rounded
            className=" text-xs px-4 py-2"
            onClick={() => handleOpenInvoiceModal()}
          >
            Add Coupon
          </Button>
        </div>

        <Couriers
          type="coupon"
          title="Coupon Details"
          fetchedData={coupons}
          loading={couponsLoading}
        />
      </div>
    </>
  );
};

export default Coupons;
