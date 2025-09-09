import FilterSelector from "../body/discover/FilterSelector"
import ButtonSideMenu from "./Button_sm"
import "./side_menu.css"


function SideMenu() {
    return(
        <div className="side-menu">
            <ButtonSideMenu label="Home"/>
            <ButtonSideMenu label="Latest"/>
            <ButtonSideMenu label="Discover"/>
            <ButtonSideMenu label="About"/>
            <div className="discover-header">
                <FilterSelector/>
            </div>
        </div>
    )
}

export default SideMenu