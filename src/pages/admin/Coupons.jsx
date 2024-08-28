import React, { useCallback, useState } from "react";
import {
  useGetCoupons,
  useGetServices,
} from "../../components/brokers/apicalls";
import Button from "../../components/Button";
import AddCoupon from "../../components/modal/restaurant/AddCoupon";
import Couriers from "./Couriers";

const Coupons = () => {
  const [credentialOpen, setCredentialsOpen] = useState(false);

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
  } = useGetCoupons();
  return (
    <>
      <AddCoupon
        isOpen={credentialOpen}
        handleCancel={handleCloseInvoiceModal}
        userRole={"RESTAURANT"}
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
