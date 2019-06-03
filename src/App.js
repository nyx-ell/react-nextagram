import React from "react";
import Axios from "axios";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./containers/navbar.js";
import HomePage from "./pages/HomePage.js";
import UserProfilePage from "./pages/UserProfilePage.js";
import MyProfilePage from "./pages/MyProfilePage";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    // GET request to NEXTagram API for users data
    Axios.get("https://insta.nextacademy.com/api/v1/users")
      .then(result => {
        // If successful, load array of all users 
        this.setState({
          users: result.data,
        })
      })
      .catch(error => {
        // If unsuccessful, console log error
        console.log("ERROR: ", error);
      })
  }

  render() {
    const { users } = this.state;
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={props => <HomePage {...props} users={users} />} />
          <Route path="/users/:id" component={props => <UserProfilePage {...props} users={users} />} />
          <Route exact path="/profile" component={MyProfilePage} />
        </Switch>
      </>
    )
  }
}

export default App;