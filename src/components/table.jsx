import React, { useContext } from "react";
import { MainContext } from "../contexts/main.context";
import './table.css';

const table = () => {
    let { data } = useContext(MainContext);
    let myLinks = [...data.myLinks];
    let trending = [...data.trending];

    let hasLinks = myLinks.length;
    let hasTrend = trending.length;

    function copyText(link) {
        navigator.clipboard.writeText(link)
            .then(() => {
                alert("Copied short link");
            })
            .catch(() => {
                alert("Unable to copy link. Higlight and copy Manually")
            })

    }

    return (
        <div className="table-container">
            <div className="table-center">
                <h2 className="table-header">Your recent URLs</h2>


                <table>
                    <thead >
                        <tr>
                            <th>Original</th>
                            <th>Shortened</th>
                            {/* <th className="copy-header"></th> */}
                            <th className="table-clicks">Clicks</th>
                        </tr>
                    </thead>
                    {hasLinks ?
                        <tbody>
                            {myLinks.map((elem) => {
                                return (
                                    <tr key={elem.linkCode}>
                                        <td>{elem.link.slice(0, 35) + "..."}</td>
                                        <td className="short-link">
                                            <i class="fas fa-link link-icon-table"></i>
                                            <span onClick={(e) => {
                                                copyText(e.currentTarget.innerText);
                                            }}>{data.host + "/" + elem.linkCode}</span>
                                        </td>
                                        {/* <td className="copy-btn"><i class="far fa-copy"></i></td> */}
                                        <td className="table-clicks">{elem.clicks}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        :
                        <h3 className="table-empty">No Recent URLs</h3>
                    }
                </table>





                <h2 className="table-header trending-header">Trending URLs</h2>

                <table>
                    <thead >
                        <th>Original</th>
                        <th>Shortened</th>
                        {/* <th className="copy-header"></th> */}
                        <th className="table-clicks">Clicks</th>
                    </thead>
                    {hasTrend ?
                        <tbody>
                            {trending.map((elem) => {
                                return (
                                    <tr key={elem.linkCode}>
                                        <td>{elem.link.slice(0, 35) + "..."}</td>
                                        <td className="short-link">
                                            <i class="fas fa-link link-icon-table"></i>
                                            <span onClick={(e) => {
                                                copyText(e.currentTarget.innerText);
                                            }}>{data.host + "/" + elem.linkCode}</span>
                                        </td>
                                        {/* <td className="copy-btn"><i class="far fa-copy"></i></td> */}
                                        <td className="table-clicks">{elem.clicks}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        :
                        <h3 className="table-empty">No Trending URL</h3>
                    }
                </table>


            </div>
        </div>
    );
}

export default table;