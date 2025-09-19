import { useContext } from "react"
import { ActiveDisplayContext } from "../../App" 

function ButtonSideMenu({label}:{label:string}) {

    const {activeDisplay, toggleActiveDisplay} = useContext(ActiveDisplayContext)

    const isActive = activeDisplay === label? true:false

    return(
        <button className={"button-side-menu"+(isActive? "-active":"")}
                onClick={() => toggleActiveDisplay(label)}>{label}</button>

    )
}

export default ButtonSideMenu