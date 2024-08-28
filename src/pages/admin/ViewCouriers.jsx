import React from "react";
import { useParams } from "react-router";
import { useGetSingleCourier } from "../../components/brokers/apicalls";
import ViewUsers from "./ViewUsers";

const ViewCouriers = () => {
  const { id } = useParams();
  const { isLoading, data, isError, error } = useGetSingleCourier(id);

  return (
    <div>
      <ViewUsers isLoading={isLoading} data={data} />
    </div>
  );
};

export default ViewCouriers;
