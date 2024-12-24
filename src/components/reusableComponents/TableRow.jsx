import PropTypes from "prop-types";

const TableRow = ({ children, index }) => {
  return (
    <tr
      className={`${index % 2 == 0 ? "bg-white" : "bg-blue-50"} cursor-pointer`}
    >
      {children}
    </tr>
  );
};

export default TableRow;

TableRow.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
};
