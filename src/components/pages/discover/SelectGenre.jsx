import { useEffect, useContext, useState } from "react";

import DropdownCheckbox from "./DropdownSelect.jsx";
import { genres } from "./constants";

function SelectGenre({setParamGenres}) {
   return(<><DropdownCheckbox list={genres} listType="genres" multiple={true} setParam={setParamGenres}/></>)
}

export default SelectGenre