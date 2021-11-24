import React from "react";
import "./shortLink.css";

const shortLink = ({ shortLink, isLoading }) => {

    function copyText() {
        navigator.clipboard.writeText(shortLink)
            .then(() => {
                alert("Copied short link");
            })
            .catch(() => {
                alert("Unable to copy link. Higlight and copy Manually")
            })

    }

    return (
        <div className="shortLink-container">
            {isLoading && <progress className="progress-bar"/>}
            {shortLink ? <p className="shortLink-div">
                <i className="fas fa-link shortLink-icon"></i>
                <span className="shortLink-input" >
                    {shortLink}
                </span>
                <i class="far fa-copy shortLink-copy-icon" onClick={copyText}></i>
            </p> : null}
        </div>
    );
}

export default shortLink