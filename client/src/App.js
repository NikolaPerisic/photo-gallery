import React from "react";
import "./App.scss";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Gallery from "./Gallery/Gallery";
import Main from "./Main/Main";
import ReleatedSearch from "./ReleatedSearch/ReleatedSearch";
import Details from "./Details/Details";
import Spinner from "./Spinner/Spinner";
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
    galleryTitle: "All Pictures",
    currentPage: 1,
    loading: false,
    mainPage: true
  };

  // on mount fetch data from server
  componentDidMount() {
    this._isMounted = true;
    this.fetchDataFromServer();
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
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
        `https://api.unsplash.com/search/photos?query=hong+kong&page=1&client_id=${
          process.env.REACT_APP_KEY
        }`
      )
      .then(response => {
        if (this._isMounted) {
          let previousSearch = this.state.search;
          this.setState({
            isLoaded: true,
            items: response.data.results,
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
    this.setState(
      {
        search: author,
        tags: [],
        galleryTitle: "All Pictures"
      },
      this.filterSearchResults(author)
    );
  };

  // search by tag, clear previous searches
  handleTagFilteredSearch = tag => {
    this.setState(
      {
        search: tag,
        tags: [],
        galleryTitle: "All Pictures"
      },
      this.filterSearchResults()
    );
  };
  // infinite scroll
  onScroll = () => {
    if (
      window.scrollY + window.innerHeight >= document.body.scrollHeight &&
      this.state.items.length &&
      !this.state.loading &&
      this.state.mainPage
    ) {
      this.setState({ loading: true });
      this.addContent();
    }
  };
  addContent = () => {
    console.log(this.props);
    this.setState({ currentPage: this.state.currentPage + 1 });
    console.log("more content");
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=hong+kong&page=${
          this.state.currentPage
        }&client_id=${process.env.REACT_APP_KEY}`
      )
      .then(response => {
        this.setState({
          items: [...this.state.items].concat(response.data.results)
        });
        setTimeout(() => {
          this.setState({ loading: false });
        }, 5000);
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };
  /**
   * main filter function, if search is coming from tag, name or author filter
   * by term otherwise filter by form input
   */
  filterSearchResults = term => {
    console.log(this.state.search);
    let search = term ? term : this.state.search.toLowerCase();
    console.log(search);
    const filterPics = [];
    console.log(this.state.items);
    this.state.items.map(el => {
      if (el.user.first_name.toLowerCase().includes(search.toLowerCase())) {
        filterPics.push(el);
      } else if (
        el.description &&
        el.description.toLowerCase().includes(search)
      ) {
        filterPics.push(el);
      } else if (el.tags) {
        for (let item of el.tags) {
          if (item.title === search) {
            filterPics.push(el);
            break;
          }
        }
      }
      return null;
    });
    console.log(filterPics);
    this.handleTitleChange(term);
    this.setState({ items: filterPics });
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
  //leaving main page
  leftMainPage = () => {
    this.setState({ mainPage: false });
    console.log(this.state.mainPage);
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
                      tags={this.state.items}
                    />
                    <Gallery
                      {...props}
                      imgs={this.state.items}
                      leftMain={this.leftMainPage}
                    />
                    <Spinner loading={this.state.loading} />
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
                      data={this.state.items}
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
