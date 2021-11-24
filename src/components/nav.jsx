import React from "react";
import "./nav.css";

const navbar = () => {
    return (
        <nav>
            <h1 className="nav-logo">
                Sho.rt
            </h1>

            {/* <div className="nav-links">
                <span className="nav-link" id="present-page">Home</span>
                <span className="nav-link">Contact</span>
                <span className="nav-link">About</span>
            </div> */}
        </nav>
    );
}

export default navbar;