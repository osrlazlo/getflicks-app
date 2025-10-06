import { useContext, useRef, useEffect } from "react";
import { BsPersonFill } from "react-icons/bs";
import { OpenDropdownContext } from "../../App";
import { userIconLabel } from "../header/Navigator";
import "./user_icon.css"
import { Link } from "react-router-dom";

export default function UserIcon() {
    const {openDropdown, toggleOpenDropdown} = useContext(OpenDropdownContext)!
    const isOpen = openDropdown === userIconLabel ? true:false

        const buttonRef = useRef<HTMLDivElement|null>(null)
        const dropdownRef = useRef<HTMLDivElement|null>(null)
        
    
        useEffect(() => {
            
            function handler(e:Event) {
                console.log(`isOpen:${isOpen}`)
                if (!isOpen || e.target instanceof Node && buttonRef.current?.contains(e.target)) return
                if (!dropdownRef.current) return
                if (e.target instanceof Node && !dropdownRef.current.contains(e.target)) {
                    console.log("click")    
                    toggleOpenDropdown("")
                    }
                }
            document.addEventListener("click", handler)
            return () => {
                document.removeEventListener("click", handler)
            }
        })

    return(
        <div>
            <div className="user-icon" ref={buttonRef}
            onClick={()=>toggleOpenDropdown(userIconLabel)}>
                <BsPersonFill />
            </div>
            {isOpen? <span ref={dropdownRef}><UserDropdown/></span>:null}
        </div>
    )
}

function UserDropdown() {
    const {openDropdown} = useContext(OpenDropdownContext)!
    const isActive = openDropdown === userIconLabel? true:false
    return(
        <>
            <div className={"user-dropdown"+(isActive? "-active":"")}>
                <Link to="/login" className="link"><h4 className="user-option">Login</h4></Link>
                <Link to="/sign-up" className="link"><h4 className="user-option">Create account</h4></Link>
            </div>
        </>
    )
}