import DropdownSelect from "./DropdownSelect.jsx"
import {sortOptions} from "./constants"

function SelectSortBy({setParamSortBy}) {
   return(<DropdownSelect list={sortOptions} listType="sort-by" multiple={false} setParam = {setParamSortBy}/>)
}

export default SelectSortBy