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
        // uri: "https://tigly.glitch.me"
        uri: "https://tigly.herokuapp.com",
        isLoadingLink: false,
    }

    count = 0;
    count1 = 0;

    populateTable = async () => {
        try {
            let keys = await localStorage.getItem("keys");
            // console.log(keys);

            let res = await fetch(this.state.uri + "/trending", {
                method: "POST",
                body: keys,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            let data = await res.json();
            // console.log(data);
            if (data.status) {
                this.count = 0;
                this.setState({ data: { ...data.links, host: data.host }, })
            }
        }
        catch (error) {
            // console.log(error);
            if (this.count < 50) {
                this.count++;
                setTimeout(async () => {
                    await this.populateTable();
                }, 3000);
            }
        }
    }

    createShortLink = async (link) => {
        console.log(link);
        let data = { link: link }
        try {
            this.setState({ isLoadingLink: true, shortLink: null });

            let result = await fetch(this.state.uri + "/shorten", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            let shortLink = await result.json();

            this.setState({ isLoadingLink: false });


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
                this.setState({ shortLink: shortLink.error });
            }
        } catch (error) {
            if (this.count1 < 5) {
                this.count1++;
                setTimeout(async () => {
                    await this.createShortLink(link);
                }, 3000);
            } else {
                this.setState({ shortLink: "Network Error", isLoadingLink: false });
            }
        }
    }

    componentDidMount = () => {
        (async () => {
            try {
                await this.populateTable();
            }
            catch (error) {

            }

        })();
    }

    render() {
        return (
            <MainContext.Provider value={{
                ...this.state,
                createShortLink: this.createShortLink
            }}>
                {this.props.children}
            </MainContext.Provider>
        );
    }
}