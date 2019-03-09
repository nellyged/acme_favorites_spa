import React, { Component } from 'react';
import { Redirect, HashRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Users from './Users';
import Things from './Things';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      tabs: {},
      users: [],
      things: [],
    };
  }
  async componentDidMount() {
    let usersHold;
    let thingsHold;
    let favsHold;
    await axios.get('/navItems').then(items => {
      this.setState({ tabs: items.data });
    });
    await axios.get('/users').then(users => {
      usersHold = users.data;
    });
    await axios.get('/things').then(things => {
      thingsHold = things.data;
    });
    await axios.get('/favorites').then(favs => {
      favsHold = favs.data;
    });

    //Concat the favs to the users and things
    usersHold.map(user => {
      user.fav = favsHold.filter(fav => fav.userId === user.id);
      return user;
    });
    thingsHold.map(thing => {
      thing.fav = favsHold.filter(fav => fav.thingId === thing.id);
      return thing;
    });

    this.setState({ users: usersHold, things: thingsHold });
  }
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Acme Favorites</h1>
          {/* placed in a route so I can get addiotnal info and still pass my own props. Remember to explicitly pass location, history, match when using the render on the route */}
          <Route
            render={props => (
              <Navbar tabs={this.state.tabs} location={props.location} />
            )}
          />
          <Route
            path="/users"
            render={() => <Users users={this.state.users} />}
          />
          <Route
            path="/things"
            render={() => <Things things={this.state.things} />}
          />
          {/* make sure that if the user comes in with nothing after the slash we direct to a tab */}
          <Route
            exact
            path="/"
            render={() => <Users users={this.state.users} />}
          />
          <Redirect to="/users" />
        </div>
      </HashRouter>
    );
  }
}
