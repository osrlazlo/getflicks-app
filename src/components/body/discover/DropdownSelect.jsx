import { useEffect, useRef, useState, useContext } from "react";
import "./filter_selector.css"

import {FaChevronDown} from "react-icons/fa"
import {FaChevronUp} from "react-icons/fa"

import { OpenDropdownContext } from "./FilterSelector";
import {createPopper, offset, viewport} from "@popperjs/core"


function DropdownSelect(props) {
    const [itemList, setItemList] = useState([])
    const [checkedIndex, setCheckedIndex] = useState(0)
    const isMultiple = props.multiple
    const {openDropdown, toggleOpenDropdown} = useContext(OpenDropdownContext)
    const isOpen = openDropdown === props.listType ? true:false
    const dropdownRef = useRef()
    const buttonRef = useRef()

    let listName = ""
    switch(props.listType) {
            case "genres": listName = "Genres"; break
            case "countries": listName = "Countries"; break
        }
    

    useEffect(() => {

        if (!props.list) return 0;

        function loadList() {
            let list = []
            switch (props.listType) {
                case "genres":
                    list = props.list.map(i => i = {id:i.id, name:i.name, isChecked:false})
                    break;
                case "countries":
                    list = props.list.map(i => i = {id:i.id, name:i.name, isChecked:false, flag:i.flag})
                    break;
                case "sort-by":
                    list = props.list.map(i => i = {id:i.sortCode, name:i.name, isChecked:false})
                    list[checkedIndex] = {...list[checkedIndex], isChecked:true}
                    break;
            }
            setItemList(l => list)
        }
        loadList()},[props.list, props.listType])

    function toggleDropdown() {
        toggleOpenDropdown(props.listType)
    }

    function toggleAll(value) {
        const newList = itemList.map(i => i = {...i, isChecked:value})
        setItemList(i => newList)
    }

    function checkItem(index) {
        let updtSelect
        if (isMultiple) {
            updtSelect = itemList.map((item,i) => 
            i === index ? {...item, isChecked:!item.isChecked} : item)
        }
        else {updtSelect = itemList.map((item,i) => item = {...item, isChecked: i === index? true:false})
        }
        setItemList(i => updtSelect)
        setCheckedIndex(c => index)
    }

    function countChecked() {
        if (!itemList) return
        const count = itemList.filter(i => i.isChecked == true)
        return count.length
    }

    useEffect(() => {
        
        function handler(e) {
            if (!isOpen) return
            if (!dropdownRef.current) return
            if (!dropdownRef.current.contains(e.target)) {
                   toggleDropdown()
                }
            }
        document.addEventListener("click", handler)
        return () => {
            document.removeEventListener("click", handler)
        }
    })

    useEffect(() => {
        if (dropdownRef.current && buttonRef.current) {
            createPopper(buttonRef.current, dropdownRef.current,
                {placement: "bottom-start", 
                modifiers: [{name: "offset", options: {offset: [0,5]}},
                            {name: "preventOverflow", options: {boundary: "viewport", padding: 8}},
                            {name: "flip", options: {fallbackPlacements: ["top","right"]}}] }
            )
        }
    })

    return(
        <>
            <div className="button-select" ref={buttonRef}
                 onClick={(e) => {e.stopPropagation(); toggleDropdown()}}>
                {isMultiple ? 
                    `${listName} (${countChecked()})` : 
                    ((itemList && itemList.length > 0) ? itemList[checkedIndex].name : "")}
                {isOpen ? <FaChevronUp className="icon"/> : <FaChevronDown className="icon"/> } 
            </div>

            <div className={"dropdown-list"+(isOpen? "-open":"")} ref={dropdownRef}>
            
            {isMultiple ?
                <div className="header">
                    <button id="select-all-genres" onClick={() => toggleAll(true)}>All</button>
                    <button id="select-none-genres" onClick={() => toggleAll(false)}>None</button>
                </div> : null}

                {isOpen ? itemList.map((item,i) => (
                    <li key={item.id} 
                            className={"item"+(item.isChecked? "-checked":"")} 
                            onClick={() => checkItem(i)}>
                        <input 
                        className="genre-checkbox"
                        id={`checkbox_${item.id}`} 
                        type="checkbox"
                        checked={item.isChecked}
                        onChange={() => checkItem(i)}/>
                        {props.listType === "countries" ? <img className="flag-icon" src={item.flag}/> : null}
                        {item.name}
                    </li>
                )) : null}
            </div>
        </>
        
    )
}

export default DropdownSelect