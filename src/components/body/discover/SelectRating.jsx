import { useState } from "react"
import { defMinRate } from "../../../../api/movieList"

function SelectRating({setParamRate}) {

    const [rating, setRating] = useState(defMinRate)

    function updtLabel(value) {
        setRating(r => value)
        setParamRate(r => value)
    }

    return(
        <>
        <label htmlFor="rating">Minimum rating: {Number(rating).toFixed(1)}</label>
        <input type="range" className="input-range" 
                id="select-rating" name="rating" 
                min="0" max="10" step="0.5"
                value={rating}
                onChange={(e) => updtLabel(e.target.value)}></input>
        </>
    )
}

export default SelectRating