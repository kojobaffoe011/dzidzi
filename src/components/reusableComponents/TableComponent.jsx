import PropTypes from "prop-types";
import NoRecord from "../notices/NoRecord";

const TableComponent = ({tablehead, tabledata, children}) => {
  return (
    <div>
         <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                {tablehead?.map((item, idx)=>{
                    return <th key={idx}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {item.title}
              </th>
                })}
            </tr>
          </thead>
           <tbody className="bg-white divide-y divide-gray-200">
                 {tabledata?.length > 0 ? 
                    <> 
                    {children} 
                  </> 
                : 
                <NoRecord/>
            } 
           </tbody>
         </table>
    </div>
  )
}

export default TableComponent

TableComponent.propTypes = {
    tablehead:  PropTypes.array,
    tabledata: PropTypes.array,
    children: PropTypes.node

}