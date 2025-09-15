import { useContext } from "react"
import { ActivePageContext, ParametersContext } from "./DiscoverPage"

export default function PageButton({page}) {
    const {activePage, toggleActivePage} = useContext(ActivePageContext)
    const isActive = activePage === page? true:false
    const {setParameters} = useContext(ParametersContext)

    return(
        <>
            <button className={"page-button"+(isActive? "-active":"")}
             onClick={() => {toggleActivePage(page); setParameters(p => p = {...p, page:page})}}>
                {page}</button>
        </>
    )

}