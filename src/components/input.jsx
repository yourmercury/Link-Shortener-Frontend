import React, { useRef, useContext } from "react";
import "./input.css";
import ShortLink from "./shortLink";
import { MainContext } from "../contexts/main.context";

const input = () => {
    let linkInput = useRef(null);
    let { createShortLink, shortLink } = useContext(MainContext);

    const onShorten = () => {
        let link = linkInput.current.value
        if (!link) return;

        linkInput.current.value = ""

        createShortLink(link);
    }

    return (
        <div className="input-container">
            <h2 className="input-header">
                Simplify your URL
            </h2>
            <div className="input-div">
                <i class="fas fa-link link-icon"></i>
                <input type="text" className="link-input"
                    placeholder="Enter url. eg, https://sefan.ru/games/sega"
                    ref={linkInput}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            onShorten();
                        }
                    }}
                    // value={link}
                />
                <button className="shorten-btn max-btn" onClick={onShorten}>
                    {/* <i class="fas fa-compress link-btn-icon"></i> */}
                    Shorten URL
                </button>
                <button className="shorten-btn mobile-btn" onClick={onShorten}>
                    Shorten
                </button>
            </div>

            <ShortLink shortLink={shortLink} />
        </div>
    );
}

export default input;