import PropTypes from "prop-types";

const TableColumnContent = ({children}) => {
  return (
     <td className="p-3 text-sm text-gray-700 whitespace-nowrap font-light">
        {children}
     </td>
  )
}

export default TableColumnContent

TableColumnContent.propTypes = {
    children: PropTypes.node
}