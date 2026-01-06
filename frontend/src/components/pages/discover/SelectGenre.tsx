import { useContext, type Dispatch, type SetStateAction } from "react";
import DropdownCheckbox from "./DropdownSelect.jsx";
import { type Genre } from "../../../../../functions/loadGenres.js";
import { GenresContext } from "../../../App.js";


interface SelectGenresProps {
   setParamGenres: Dispatch<SetStateAction<Genre[]>>
}
function SelectGenre({setParamGenres}:SelectGenresProps) {
   const {genres} = useContext(GenresContext)
   return(<><DropdownCheckbox list={genres} listType="genres" multiple={true} setParam={setParamGenres}/></>)
}

export default SelectGenre