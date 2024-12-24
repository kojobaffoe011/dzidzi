import PropTypes from "prop-types";

const FilterType = ({ filterType, handleFilterChange, placeholder }) => {
  const types = ["DROPDOWN", "INPUTFIELD"];

  if (filterType && !types.includes(filterType)) {
    throw new Error("invalidType");
  }

  const renderContent = () => {
    if (filterType == "INPUTFIELD") {
      return (
        <div className="">
          <label className="text-xs text-gray-400">{placeholder}:</label>
          <input
            className="border outline-none p-2 text-xs border border-black w-full rounded placeholder:text-xs"
            type="text"
            onChange={handleFilterChange}
            // placeholder={placeholder}
            // value={filterText}
          />
        </div>
      );
    }
  };
  return <div>{renderContent()}</div>;
};

export default FilterType;

FilterType.propTypes = {
  filterType: PropTypes.string,
  handleFilterChange: PropTypes.func,
  placeholder: PropTypes.string,
  filterText: PropTypes.string,
};
