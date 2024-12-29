import PropTypes from "prop-types";
import nodata from "../../assets/images/no-data.png";

const NoDataFound = ({ title }) => {
  return (
    <div className="flex flex-col w-full items-center justify-center p-3 rounded-md gap-6">
      <div>
        <img src={nodata} alt="" width={300} className="" />
      </div>
      <p className="text-blue-600 font-extrabold">{title}</p>
    </div>
  );
};

export default NoDataFound;

NoDataFound.propTypes = {
  title: PropTypes.string,
};
