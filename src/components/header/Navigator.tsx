import ButtonNav from "./Button_nav"
import "./navigator.css"

export const homeLabel = "Home"
export const latestLabel = "Latest"
export const discoverLabel = "Discover"
export const aboutLabel = "About"

function Navigator() {

    return(
        <div className="navigator">
            <ButtonNav label={homeLabel}/>
            <ButtonNav label={latestLabel}/>
            <ButtonNav label={discoverLabel}/>
            <ButtonNav label={aboutLabel}/>
        </div>
    )
}

export default Navigator