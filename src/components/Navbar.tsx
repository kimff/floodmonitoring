import React, { useState } from "react";
import { NavLink } from "react-router-dom"
const Navbar = () => {

    const [navlinkOpen, navlinkToggle] = useState(false);

    const handlenavlinkToggle = () => {
        navlinkToggle(!navlinkOpen)
    }

    const renderClassNavlink = () => {
        let classesNavlink: string = "navlinks";

        if (navlinkOpen) {
            classesNavlink += " activeSidebar"
        }
        return classesNavlink;
    }

    return (
        <nav>
            <div className="logo">
                <i className="fa-solid fa-house-flood-water"></i>
                <h4>Flood Montoring</h4>
            </div>
            <ul className={renderClassNavlink()}>
                <li><NavLink className="tabLink" to="/live" onClick={handlenavlinkToggle}>Live Flood</NavLink></li>
                {/* <li><NavLink className="tabLink" to="/weather" onClick={handlenavlinkToggle}>Weather News</NavLink></li> */}
                <li><NavLink className="tabLink" to="/history" onClick={handlenavlinkToggle}>History</NavLink></li>
                <li><NavLink className="tabLink" to="/contact" onClick={handlenavlinkToggle}>Contact</NavLink></li>

            </ul>
            <div onClick={handlenavlinkToggle} className="hamburger-toggle">
                <i className="fas fa-bars fa-lg"></i>
            </div>
        </nav>

    )
}

export default Navbar;