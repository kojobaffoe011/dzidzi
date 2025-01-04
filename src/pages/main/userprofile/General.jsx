import { useOutletContext } from "react-router";
import UserProfileDetails from "../../../components/reusableComponents/UserProfileDetails";
import TwoFALogic from "../../../components/reusableComponents/TwoFALogic";
import EditPassword from "../../../components/reusableComponents/EditPassword";
import EditAddress from "../../../components/reusableComponents/EditAddress";

const General = () => {
  const [data] = useOutletContext();
  return (
    <div>
      <UserProfileDetails data={data} />
      <div className="grid grid-cols-4 mt-4 gap-4">
        <EditPassword username={data?.credential?.username} />
        <EditAddress />
        <TwoFALogic username={data?.credential?.username} />
      </div>
    </div>
  );
};

export default General;
