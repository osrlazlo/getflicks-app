import { useState } from "react"

function SelectDate({setParamDateFrom, setParamDateTo}) {
    const nextYear = new Date().getFullYear()+1
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState(nextYear)

    return(
        <>
        <h4>Release Year</h4>
        <div className="date" id="date-from">
            <h5>From:</h5>
            <input type="number" min="1900" max={nextYear-1} step="1" value={dateFrom} 
            onChange={e => {
                setDateFrom(d => e.target.value > (nextYear-1) ? nextYear-1:e.target.value)
                setParamDateFrom(d => e.target.value > (nextYear-1) ? nextYear-1:e.target.value)
                if (dateTo <= e.target.value)
                    setDateTo(d => Number(e.target.value)+1)
                    setParamDateTo(d => Number(e.target.value)+1)
            }}
            onBeforeInput={(e) => {if (e.target.value.length > 3) e.preventDefault()}}></input>
        </div>
        <div className="date" id="date-to">
            <h5>To:</h5>
            <input type="number" min="1900" max={nextYear} step="1" value={dateTo} 
            onChange={e => {
                setDateTo(d => e.target.value > (nextYear) ? nextYear:e.target.value)
                setParamDateTo(d => e.target.value > (nextYear) ? nextYear:e.target.value)
                if (e.target.value && dateFrom >= e.target.value)
                    setDateFrom(d => e.target.value-1)
                    setParamDateFrom(d => e.target.value-1)
            }}
            onBeforeInput={(e) => {if (e.target.value.length > 3) e.preventDefault()}}></input>
        </div>
        </>
    )
}

export default SelectDate