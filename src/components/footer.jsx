import React from "react";
import "./footer.css";

const footer = () => {
    return (
        <div className="footer-container">
            <p className="footer-content">
                © 2021 tig.ly. <span className="footer-pleading">I can code.. Please Hire me</span>
                <a href="https://twiiter.com/polycarp_momoh" className="twitter"><i class="fab fa-twitter"></i></a>
            </p>
        </div>
    );
}

export default footer;