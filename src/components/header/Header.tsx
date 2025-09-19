import Navigator from "./Navigator"

function Header() {
    return(
        <div className="header-container">
            <h2>getflicks</h2>
            <div className="page-nav">
                <Navigator/>
            </div>
        </div>
    )
}

export default Header