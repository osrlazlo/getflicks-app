import SelectDate from "./SelectDate"
import SelectGenre from "./SelectGenre"
import SelectRating from "./SelectRating"
function FilterSelector() {
    return(
        <div className="filter-selector">
            <SelectGenre/>
            <SelectRating/>
            <SelectDate/>
        </div>
    )
}

export default FilterSelector