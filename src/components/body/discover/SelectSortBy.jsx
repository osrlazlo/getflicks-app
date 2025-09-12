import DropdownSelect from "./DropdownSelect"
import {sortOptions} from "./sortOptionsModule.js"

function SelectSortBy({setParamSortBy}) {
   return(<DropdownSelect list={sortOptions} listType="sort-by" multiple={false} setParam = {setParamSortBy}/>)
}

export default SelectSortBy