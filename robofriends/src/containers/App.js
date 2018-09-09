import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/Searchbox";
// import { robots } from "./robots";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      // .then(users => {});
      .then(users => this.setState({ robots: users }));
    // this.setState({robots: robots});
  }

  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name
        .toLowerCase()
        .includes(this.state.searchField.toLowerCase());
    });
    if (this.state.robots.length === 0) {
      return (
        <div className="tc">
          <h1 className="f1"> Loading </h1>{" "}
        </div>
      );
    } else {
      return (
        <div className="tc">
          <h1 className="f1 "> RoboFriends </h1>{" "}
          <SearchBox searchChange={this.onSearchChange} />{" "}
          <Scroll>
            <ErrorBoundary>
              {" "}
              <CardList robots={filteredRobots} />{" "}
            </ErrorBoundary>
          </Scroll>{" "}
        </div>
      );
    }
  }
}

export default App;
