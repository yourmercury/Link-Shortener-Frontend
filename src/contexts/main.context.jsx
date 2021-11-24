import React, { Component, createContext } from "react";

export const MainContext = createContext();


export default class MainContextProvider extends Component {
    state = {
        shortLink: null,
        errorMessage: null,
        data: {
            myLinks: [],
            trending: [],
            host: ""
        },

        uri: "https://tigly.glitch.me"
    }

    populateTable = async () => {
        try {
            let keys = await localStorage.getItem("keys");
            console.log(keys);

            let res = await fetch(this.state.uri + "/trending", {
                method: "POST",
                body: keys,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            let data = await res.json();
            console.log(data);
            this.setState({data: {...data.links, host: data.host}, })
        }
        catch (error) {
            console.log(error);
        }
    }

    createShortLink = async (link) => {
        console.log(link);
        let data = { link: link }
        try {
            let result = await fetch(this.state.uri + "/shorten", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            let shortLink = await result.json();

            if (shortLink.status) {
                this.setState({ shortLink: shortLink.shortened_link });

                let keys = await localStorage.getItem("keys");
                console.log("done", keys)


                if (keys) {
                    keys = JSON.parse(keys);
                    let values = await localStorage.getItem("values");
                    values = JSON.parse(values);
                    !keys.includes(shortLink.shortened_link) && keys.length >= 3 && keys.pop();
                    !keys.includes(shortLink.shortened_link) && keys.unshift(shortLink.shortened_link);
                    !values.includes(link) && values.length >= 3 && values.pop();
                    !values.includes(link) && values.unshift(link);

                    await localStorage.setItem("keys", JSON.stringify(keys));
                    await localStorage.setItem("values", JSON.stringify(values));
                } else {
                    await localStorage.setItem("keys", JSON.stringify([shortLink.shortened_link]));
                    await localStorage.setItem("values", JSON.stringify([link]));
                }

                await this.populateTable();


            } else {
                this.setState({ errorMessage: shortLink.error });
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount = () => {
        (async () => {
            this.populateTable();
        })();
    }

    render() {
        return (
            <MainContext.Provider value={{
                ...this.state,
                createShortLink :this.createShortLink
            }}>
                {this.props.children}
            </MainContext.Provider>
        );
    }
}