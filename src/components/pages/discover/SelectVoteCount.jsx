import { useState } from "react"
import { defMinVoteCount } from "./constants" 

function SelectVoteCount({setParamVoteCount}) {

    const [count, setCount] = useState(defMinVoteCount)

    function updtLabel(value) {
        setCount(c => value)
        setParamVoteCount(c => value)
    }

    return(
        <>
        <label htmlFor="vote-count">Minimum vote count: {count}</label>
        <input type="range" className="input-range" 
                id="select-vote-count" name="vote-count" 
                min="0" max="500" step="50"
                value={count}
                onChange={(e) => updtLabel(e.target.value)}></input>
        </>
    )
}

export default SelectVoteCount