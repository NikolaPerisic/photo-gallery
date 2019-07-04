import React from "react";
import "./App.scss";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Gallery from "./Gallery/Gallery";
import Main from "./Main/Main";
import ReleatedSearch from "./ReleatedSearch/ReleatedSearch";
import Details from "./Details/Details";

/**
 * Since the project is small two page site, I opted out for using default state
 * management with one class based component and a couple of functional components,
 * where state logic is in App component.
 */
class App extends React.Component {
  _isMounted = false;
  state = {
    isLoaded: false,
    items: [],
    error: null,
    search: "",
    tags: [],
    galleryTitle: "All Pictures"
  };

  // on mount fetch data from server
  componentDidMount() {
    this._isMounted = true;
    this.fetchDataFromServer();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  /**
   * previousSearch is used here to store new search variable that is coming
   * from handleAuthorFilteredSearch and handleTagFilteredSearch functions which
   * both trigger new api call and clear previous searches and state
   */
  fetchDataFromServer = () => {
    axios
      .get(
        `https://api.unsplash.com/photos/?client_id=${
          process.env.REACT_APP_KEY
        }`
      )
      .then(response => {
        console.log(response.data);
        if (this._isMounted) {
          let previousSearch = this.state.search;
          this.setState({
            isLoaded: true,
            items: response.data,
            search: previousSearch
          });
          if (this.state.search) {
            this.filterSearchResults();
          }
        }
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  /**
   * handle search by tag, check if tag array cointains searched term and
   * trigger new filter
   */
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

  // handle search coming from form input
  handleSubmitSearch = e => {
    e.preventDefault();
    this.fetchDataFromServer();
  };

  // seach by author, clear previous searches
  handleAuthorFilteredSearch = author => {
    this.setState({
      search: author,
      tags: [],
      galleryTitle: "All Pictures"
    });
    this.fetchDataFromServer();
  };

  // search by tag, clear previous searches
  handleTagFilteredSearch = tag => {
    this.setState({
      search: tag,
      tags: [],
      galleryTitle: "All Pictures"
    });
    this.fetchDataFromServer();
  };

  /**
   * main filter function, if search is coming from tag, name or author filter
   * by term otherwise filter by form input
   */
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

  // handle gallery title change after search term initiated
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

  // update search term coming from form input
  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  // if state is loaded render components
  render() {
    return (
      <div className="App">
        {this.state.isLoaded ? (
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <Header
                    handleInputChange={this.handleInputChange}
                    userInput={this.state.search}
                    inputSearch={this.handleSubmitSearch}
                    tagSearch={this.handleTagFilteredSearch}
                  />
                  <div className="main-content">
                    <Main
                      count={this.state.items.length}
                      title={this.state.galleryTitle}
                    />
                    <ReleatedSearch
                      items={this.state.tags}
                      releatedSearch={this.handleReleatedSearch}
                      tags={this.state.items.pictures}
                    />
                    <Gallery {...props} imgs={this.state.items} />
                  </div>
                </React.Fragment>
              )}
            />
            <Route
              path="/:id"
              render={props => (
                <React.Fragment>
                  <Header
                    handleInputChange={this.handleInputChange}
                    userInput={this.state.search}
                    inputSearch={this.handleSubmitSearch}
                    tagSearch={this.handleTagFilteredSearch}
                  />
                  <div className="main-content">
                    <Details
                      {...props}
                      data={this.state.items.pictures}
                      filterByAuthor={this.handleAuthorFilteredSearch}
                      filterByTag={this.handleTagFilteredSearch}
                    />
                  </div>
                </React.Fragment>
              )}
            />
          </Switch>
        ) : null}
      </div>
    );
  }
}

export default App;
