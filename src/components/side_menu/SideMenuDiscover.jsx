import FilterSelector from "../body/discover/FilterSelector"
import ButtonSideMenu from "./Button_sm"
import Navigator from "./Navigator"
import "./side_menu.css"


function SideMenuDiscover() {
    return(
        <div className="side-menu">
            <Navigator/>
            <div className="discover-filters">
                <FilterSelector/>
            </div>
        </div>
    )
}

export default SideMenuDiscover