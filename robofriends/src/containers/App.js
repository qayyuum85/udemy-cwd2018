import React, { Component } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/Searchbox";
// import { robots } from "./robots";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";
import { setSearchField, requestRobots } from "../action.js";

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  };
};

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     robots: []
  //   };
  // }

  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then(response => response.json())
    //   // .then(users => {});
    //   .then(users => this.setState({ robots: users }));
    // // this.setState({robots: robots});

    this.props.onRequestRobots();
  }

  render() {
    // const {robots} = this.state;
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    // if (!robots.length) {
    if (isPending) {
      return (
        <div className="tc">
          <h1 className="f1"> Loading </h1>{" "}
        </div>
      );
    } else {
      return (
        <div className="tc">
          <h1 className="f1 "> RoboFriends </h1>{" "}
          <SearchBox searchChange={onSearchChange} />{" "}
          <Scroll>
            <ErrorBoundary>
              {" "}
              <CardList robots={filteredRobots} />{" "}
            </ErrorBoundary>{" "}
          </Scroll>{" "}
        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
