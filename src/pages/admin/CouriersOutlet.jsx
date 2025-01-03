import { Outlet } from "react-router";
import TabComponent from "../../components/reusableComponents/TabComponent";

const CouriersOutlet = () => {
  const tabs = [
    {
      name: "All",
      url: "",
    },
    {
      name: "Online",
      url: "online",
    },
  ];
  return (
    <div>
      <TabComponent tabs={tabs} />
      <Outlet />
    </div>
  );
};

export default CouriersOutlet;
