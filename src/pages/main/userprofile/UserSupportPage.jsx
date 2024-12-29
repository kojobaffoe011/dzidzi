import { Outlet } from "react-router";
import TabComponent from "../../../components/reusableComponents/TabComponent";

const UserSupportPage = () => {
  const tabs = [
    {
      name: "Contact",
      url: "",
    },
    {
      name: "View Tickets",
      url: "tickets",
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <TabComponent tabs={tabs} />
      <Outlet />
    </div>
  );
};

export default UserSupportPage;
