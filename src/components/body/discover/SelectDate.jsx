import { useState } from "react"

function SelectDate() {

    const [dateFrom, setDateFrom] = useState("")

    const cd = new Date()
    const [dateTo, setDateTo] = useState(`${cd.getFullYear()}-${String(cd.getMonth()+1).padStart(2,"0")}-${String(cd.getDate()).padStart(2,"0")}`)
    console.log(dateTo)
    return(
        <>
        <h4>Release Date</h4>
        <h5>From:</h5>
        <input type="date" value={dateFrom} onChange={e => setDateFrom(d => e.target.value)}></input>
        <h5>To:</h5>
        <input type="date" value={dateTo} onChange={e => setDateTo(d => e.target.value)}></input>
        </>
    )
}

export default SelectDate