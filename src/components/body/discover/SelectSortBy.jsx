import DropdownSelect from "./DropdownSelect"
import "./filter_selector.css"

function SelectSortBy() {

    const sortOptions = [
        {sortCode: "original_title.asc", name: "Title (A-Z)"},
        {sortCode: "original_title.desc", name: "Title (Z-A)"},
        {sortCode: "popularity.desc", name: "Most Popular"},
        {sortCode: "popularity.asc", name: "Least Popular"},
        {sortCode: "vote_average.desc", name: "Highest Rating"},
        {sortCode: "vote_average.asc", name: "Lowest Rating"}
    ]

   return(<DropdownSelect list={sortOptions} listType="sort-by"/>)
}

export default SelectSortBy