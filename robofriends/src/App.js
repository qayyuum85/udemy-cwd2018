import React, { Component } from "react";
import CardList from "./CardList";
import SearchBox from "./Searchbox";
// import { robots } from "./robots";
import Scroll from "./Scroll";
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
          <h1 className="f1">Loading</h1>
        </div>
      );
    } else {
      return (
        <div className="tc">
          <h1 className="f1 "> RoboFriends </h1>{" "}
          <SearchBox searchChange={this.onSearchChange} />{" "}
          <Scroll>
            <CardList robots={filteredRobots} />{" "}
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
