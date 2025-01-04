import { useMutation } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";
import { useChange2FAStaus } from "../brokers/apicalls";
import Spinner from "../loaders/Spinner";
import Button from "./Button";
import { useState } from "react";
import PropTypes from "prop-types";

const TwoFALogic = ({ username }) => {
  const [twoFa, set2FA] = useState(false);

  const { mutationFn } = useChange2FAStaus();

  const { mutate, isPending } = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      set2FA(!twoFa);
      showSuccessToast("Save changes successfully");
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs italic font-thin">Two Factor Authentication</p>
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center justify-between gap-1">
          <p className="text-sm font-light">2FA is</p>
          {twoFa ? (
            <p className="text-sm font-bold text-green-600">
              enabled <span className="text-black font-light">?</span>
            </p>
          ) : (
            <p className=" text-sm font-bold text-red-600">
              disabled <span className="text-black font-light"></span>
            </p>
          )}
        </div>

        <Button
          className={`px-4 py-1 text-xs `}
          rounded
          variant={twoFa ? "danger" : "success"}
          disabled={isPending}
          onClick={() =>
            mutate({
              status: twoFa,
              username: username,
            })
          }
        >
          {isPending ? (
            <Spinner size={"10px"} />
          ) : (
            <p>{twoFa ? "Disable" : "Enable"}</p>
          )}
        </Button>
      </div>
    </div>
  );
};

export default TwoFALogic;

TwoFALogic.propTypes = {
  username: PropTypes.string,
};
