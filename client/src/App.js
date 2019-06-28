import React from "react";
import "./App.scss";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Gallery from "./Gallery/Gallery";
import Main from "./Main/Main";
import ReleatedSearch from "./ReleatedSearch/ReleatedSearch";
import Details from "./Details/Details";

class App extends React.Component {
    state = {
        isLoaded: false,
        items: [],
        error: null,
        search: "",
        tags: [],
        galleryTitle: "All Pictures"
    };
    componentDidMount() {
        this.fetchDataFromServer();
    }
    fetchDataFromServer = () => {
        axios
            .get("http://localhost:5000/pictures")
            .then(response => {
                let previousSearch = this.state.search;
                this.setState({
                    isLoaded: true,
                    items: response.data,
                    search: previousSearch
                });
                if (this.state.search) {
                    this.filterSearchResults();
                }
            })
            .catch(error => {
                this.setState({ error: error });
            });
    };
    handleReleatedSearch = e => {
        let releatedBtns = [...this.state.tags];
        if (!releatedBtns.includes(e)) {
            releatedBtns.push(e);
        }
        this.setState(
            {
                tags: releatedBtns
            },
            this.filterSearchResults(e)
        );
    };
    handleSubmitSearch = e => {
        e.preventDefault();
        this.fetchDataFromServer();
    };
    handleAuthorFilteredSearch = author => {
        this.setState({
            search: author,
            tags: [],
            galleryTitle: "All Pictures"
        });
        this.fetchDataFromServer();
    };
    handleTagFilteredSearch = tag => {
        this.setState({
            search: tag,
            tags: [],
            galleryTitle: "All Pictures"
        });
        this.fetchDataFromServer();
    };
    filterSearchResults = term => {
        const search = term ? term : this.state.search.toLowerCase();
        const filterPics = [];
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
        this.handleTitleChange(term);
        this.setState({ items: updateItems });
    };
    handleTitleChange = term => {
        let title = "";
        if (!term) {
            title = `${this.state.search.charAt(0).toUpperCase() +
                this.state.search.slice(1)} pictures`;
        } else if (term && !this.state.search) {
            title = `${term.charAt(0).toUpperCase() + term.slice(1)} pictures`;
        } else {
            title = `${this.state.search.charAt(0).toUpperCase() +
                this.state.search.slice(1)} & ${term} pictures`;
        }
        this.setState({ galleryTitle: title });
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
                    inputSearch={this.handleSubmitSearch}
                    tagSearch={this.handleTagFilteredSearch}
                />
                <div className="main-content">
                    {this.state.isLoaded ? (
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <React.Fragment>
                                        <Main
                                            count={
                                                this.state.items.pictures.length
                                            }
                                            title={this.state.galleryTitle}
                                        />
                                        <ReleatedSearch
                                            items={this.state.tags}
                                            releatedSearch={
                                                this.handleReleatedSearch
                                            }
                                            tags={this.state.items.pictures}
                                        />
                                        <Gallery
                                            {...props}
                                            imgs={this.state.items.pictures}
                                        />
                                    </React.Fragment>
                                )}
                            />
                            <Route
                                path="/:id"
                                render={props => (
                                    <Details
                                        {...props}
                                        data={this.state.items.pictures}
                                        filterByAuthor={
                                            this.handleAuthorFilteredSearch
                                        }
                                        filterByTag={
                                            this.handleTagFilteredSearch
                                        }
                                    />
                                )}
                            />
                        </Switch>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default App;
