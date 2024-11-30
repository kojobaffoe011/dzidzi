import React, { useCallback, useState } from "react";
import { useGetServices } from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import AddCredentialModal from "../../components/modal/restaurant/AddCredentialModal";
import Couriers from "./Couriers";

const Services = () => {
  const [credentialOpen, setCredentialsOpen] = useState(false);

  const handleOpenInvoiceModal = useCallback(() => {
    setCredentialsOpen(true);
  }, []);
  const handleCloseInvoiceModal = useCallback(() => {
    setCredentialsOpen(false);
  }, []);
  const {
    data: services,
    isLoading: servicesLoading,
    isError: servicesError,
    error: isServicesError,
  } = useGetServices();
  return (
    <div className="mt-4">
      <AddCredentialModal
        isOpen={credentialOpen}
        handleCancel={handleCloseInvoiceModal}
        userRole={"SERVICE"}
        width="400px"
      />
      <div className="flex justify-end">
        <Button
          variant="primary"
          className="px-2 py-2 text-sm"
          rounded
          onClick={() => {
            handleOpenInvoiceModal();
          }}
        >
          Add Services
        </Button>
      </div>
      <Couriers
        title="Services Details"
        fetchedData={services}
        loading={servicesLoading}
        link={"services"}
      />
    </div>
  );
};

export default Services;
