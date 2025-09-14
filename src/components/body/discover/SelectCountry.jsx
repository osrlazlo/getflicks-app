import { useEffect, useState } from "react"
import DropdownCheckbox from "./DropdownSelect.jsx"

function SelectCountry({setParamCountries}) {

    const [countries, setCountries] = useState([])
    
    useEffect(() => {
        async function loadCountries() {
            const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2")
            const data = await res.json();
            const countryList = data.map(c => c = {name:c.name.common, flag:c.flags.svg, id:c.cca2})
            setCountries(c => countryList)
        }   
    loadCountries()}, [])

    countries.sort((a,b) => a.name.localeCompare(b.name))

    return(<DropdownCheckbox list={countries} listType="countries" multiple={false} setParam={setParamCountries}/>)
}

export default SelectCountry