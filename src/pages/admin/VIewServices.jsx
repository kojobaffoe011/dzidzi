import React from "react";
import { useParams } from "react-router";
import { useGetSingleService } from "../../components/brokers/apicalls";
import ViewUsers from "./ViewUsers";

const VIewServices = () => {
  const { id } = useParams();
  const { isLoading, data, isError, error } = useGetSingleService(id);

  return (
    <div>
      <ViewUsers isLoading={isLoading} data={data} />
    </div>
  );
};

export default VIewServices;
