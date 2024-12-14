import PropTypes from "prop-types";


const TableRow = ({children, index}) => {
  return (
    <tr className={`${index % 2 == 0 ? "bg-white" : "bg-gray-50"} `}>
        {children}
    </tr>
  )
}

export default TableRow

TableRow.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number
}