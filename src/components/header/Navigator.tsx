import ButtonNav from "./Button_nav"
import { NavOriginContext } from "../../App"
import "./navigator.css"
import { useContext } from "react"

export const homeLabel = "home"
export const latestLabel = "latest"
export const discoverLabel = "discover"
export const aboutLabel = "about"
export const userIconLabel = "user"

export default function Navigator() {

    const { toggleNavOrigin } = useContext(NavOriginContext)!

    return(
        <div className="navigator">
            <ButtonNav label={homeLabel}/>
            <ButtonNav label={latestLabel}/>
            <span onClick={()=>toggleNavOrigin(homeLabel)}><ButtonNav label={discoverLabel}/></span>
            <ButtonNav label={aboutLabel}/>
        </div>
    )
}