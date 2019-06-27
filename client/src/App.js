import React from "react";
import "./App.scss";
import axios from "axios";
import Header from "./Header/Header";
import Gallery from "./Gallery/Gallery";
import Main from "./Main/Main";
import ReleatedSearch from "./ReleatedSearch/ReleatedSearch";

class App extends React.Component {
    state = {
        isLoaded: false,
        items: [],
        error: null,
        search: "",
        btnHighlight: []
    };
    componentDidMount() {
        axios
            .get("http://localhost:5000/pictures")
            .then(response => {
                this.setState({
                    isLoaded: true,
                    items: response.data
                });
            })
            .catch(error => {
                this.setState({ error: error });
            });
    }
    handleReleatedSearch = e => {
        let reletedBtns = [...this.state.btnHighlight];
        if (!reletedBtns.includes(e)) {
            reletedBtns.push(e);
        }
        console.log(this.state.btnHighlight);
        this.setState(
            {
                search: e,
                btnHighlight: reletedBtns
            },
            this.handleSearch
        );
    };
    handleSearch = e => {
        if (e) e.preventDefault();
        const search = this.state.search.toLowerCase();
        let filterPics = [];
        this.state.items.pictures.map(el => {
            if (el.author.toLowerCase().includes(search)) {
                filterPics.push(el);
            } else if (el.name.toLowerCase().includes(search)) {
                filterPics.push(el);
            } else if (el.tags) {
                for (let item of el.tags) {
                    if (item === search) {
                        filterPics.push(el);
                        break;
                    }
                }
            }
            return null;
        });
        let updateItems = { ...this.state.items };
        updateItems.pictures = filterPics;
        this.setState({ items: updateItems });
        console.log(this.state);
    };
    handleInputChange = event => {
        this.setState({ search: event.target.value });
    };
    render() {
        return (
            <div className="App">
                <Header
                    handleInputChange={this.handleInputChange}
                    userInput={this.state.search}
                    inputSearch={this.handleSearch}
                />
                <div className="main-content">
                    {this.state.isLoaded ? (
                        <React.Fragment>
                            <Main count={this.state.items.pictures.length} />
                            <ReleatedSearch
                                btnHighlight={this.state.btnHighlight}
                                releatedSearch={this.handleReleatedSearch}
                                tags={this.state.items.pictures}
                            />
                            <Gallery imgs={this.state.items.pictures} />
                        </React.Fragment>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default App;
