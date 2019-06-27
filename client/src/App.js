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
        error: null
    };
    componentDidMount() {
        axios
            .get("http://localhost:5000/pictures")
            .then(response => {
                this.setState({
                    isLoaded: true,
                    items: response.data
                });
                console.log(this.state);
            })
            .catch(error => {
                this.setState({ error: error });
            });
    }
    render() {
        return (
            <div className="App">
                <Header />
                <div className="main-content">
                    {this.state.isLoaded ? (
                        <React.Fragment>
                            <Main />
                            <ReleatedSearch tags={this.state.items.pictures} />
                            <Gallery />
                        </React.Fragment>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default App;
