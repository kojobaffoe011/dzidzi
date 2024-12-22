import PropTypes from "prop-types"

const FilterComponent = ({filterType, handleFilterChange}) => {
    const types = ['DROPDOWN', 'INPUTFIELD']

    if(filterType && !types.includes(filterType)){
        throw new Error('invalidType')
    }


//      const handleFilterChange = (event) => {
//     setFilterText(event.target.value);
//   };

    const renderContent = ()=> {
        if(filterType == 'INPUTFIELD'){
            return <div className="my-2">
               <input
                    className="border outline-none py-3 px-4 text-sm border border-black w-full rounded placeholder:text-xs"
                    type="text"
                    // value={filterText}
                    onChange={handleFilterChange}
                    placeholder="Filter by name"
               />
            </div>
        }
    }
  return (
    <div>
        {renderContent()}
    </div>
  )
}

export default FilterComponent

FilterComponent.propTypes = {
    filterType: PropTypes.string,
    handleFilterChange: PropTypes.func
}