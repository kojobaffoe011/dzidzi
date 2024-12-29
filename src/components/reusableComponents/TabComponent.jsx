import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const TabComponent = ({ tabs }) => {
  const [url, setUrl] = useState("");
  return (
    <div className="flex ">
      <div className="p-1 flex rounded-md gap-1 bg-slate-50">
        {tabs?.map((tab, idx) => {
          const tab_url = tab?.url;
          const tab_name = tab?.name;
          return (
            <Link key={idx} to={tab_url}>
              <div
                className={`px-6 py-2 border hover:cursor-pointer rounded-sm hover:border hover:border-blue-200 hover:border-2 hover:bg-blue-50 hover:shadow-md ${
                  // pathname.includes(url)
                  url == tab_url
                    ? "border border-blue-200 border-2 bg-blue-50 shadow-md"
                    : "border border-gray-200 border-2 bg-white"
                }`}
                onClick={() => setUrl(tab_url)}
              >
                <p
                  className={`text-xs font-bold hover:text-blue-600 ${
                    url == tab_url ? "text-blue-600 " : ""
                  }`}
                >
                  {tab_name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
  // );
};

export default TabComponent;

TabComponent.propTypes = {
  tabs: PropTypes.array,
};
