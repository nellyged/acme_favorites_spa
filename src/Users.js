import React from 'react';
import { Route } from 'react-router-dom';
import Favorites from './Favorites';

const Users = props => {
  return (
    <ul>
      {props.users.map(user => {
        return (
          <li key={user.id}>
            {user.name}
            <Route
              render={favProps => (
                <Favorites favs={user.fav} location={favProps.location} />
              )}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Users;
