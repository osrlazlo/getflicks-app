import DropdownSelect from "./DropdownSelect"
import {sortOptions} from "./constants.js"

function SelectSortBy({setParamSortBy}) {
   return(<DropdownSelect list={sortOptions} listType="sort-by" multiple={false} setParam = {setParamSortBy}/>)
}

export default SelectSortBy