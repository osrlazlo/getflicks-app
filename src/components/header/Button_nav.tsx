import { useContext } from "react"
import { ActiveDisplayContext} from "../../App" 
import { Link} from "react-router-dom"

export default function ButtonSideMenu({label}:{label:string}) {

    const {activeDisplay, toggleActiveDisplay} = useContext(ActiveDisplayContext)
    const isActive = activeDisplay === label? true:false

    return(
       <Link to={`/${label}`}> 
       <button className={"button-nav"+(isActive? "-active":"")}
                onClick={() => toggleActiveDisplay(label)}>
                    {label.substring(0,1).toUpperCase()+label.substring(1)}
        </button> 
        </Link>
    )
}