import ButtonSideMenu from "./Button_sm"
import "./side_menu.css"

export const homeLabel = "Home"
export const latestLabel = "Latest"
export const discoverLabel = "Discover"
export const aboutLabel = "About"

function Navigator() {

    return(
        <div className="navigator">
            <ButtonSideMenu label={homeLabel}/>
            <ButtonSideMenu label={latestLabel}/>
            <ButtonSideMenu label={discoverLabel}/>
            <ButtonSideMenu label={aboutLabel}/>
        </div>
    )
}

export default Navigator