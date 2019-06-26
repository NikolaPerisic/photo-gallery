import React from "react";
import "./App.scss";
import axios from "axios";
import Header from "./Header/Header";
import Gallery from "./Gallery/Gallery";

class App extends React.Component {
    state = {
        isLoaded: false,
        items: []
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
                console.log(error);
            });
    }
    render() {
        return (
            <div className="App">
                <Header />
                <Gallery />
            </div>
        );
    }
}

export default App;
