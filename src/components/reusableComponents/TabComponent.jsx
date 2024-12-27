import PropTypes from "prop-types";
import { useLocation } from "react-router";

const TabComponent = ({ tabs }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex ">
      <div className="p-1 flex rounded-md gap-1 bg-slate-50">
        {tabs?.map((tab, idx) => {
          return (
            <div
              key={idx}
              className={`px-6 py-2 border hover:cursor-pointer rounded-sm hover:border hover:border-blue-200 hover:border-2 hover:bg-blue-50 hover:shadow-md ${
                pathname.includes(tab?.url)
                  ? "border border-blue-200 border-2 bg-blue-50 shadow-md"
                  : "border border-gray-200 border-2 bg-white"
              }`}
            >
              <p
                className={`text-xs font-bold hover:text-blue-600 ${
                  pathname.includes(tab?.url) ? "text-blue-600 " : ""
                }`}
              >
                {tab.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabComponent;

TabComponent.propTypes = {
  tabs: PropTypes.array,
};
