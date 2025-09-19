import FilterSelector from "../pages/discover/FilterSelector"
import "./side_menu.css"


function SideMenuDiscover() {
    return(
        <div className="side-menu">
            <div className="discover-filters">
                <FilterSelector/>
            </div>
        </div>
    )
}

export default SideMenuDiscover