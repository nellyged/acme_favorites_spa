import React from 'react';
import { Route } from 'react-router-dom';
import Favorites from './Favorites';

const Things = props => {
  return (
    <ul>
      {props.things.map(thing => {
        return (
          <li key={thing.id}>
            {thing.name}
            <Route
              render={favProps => (
                <Favorites favs={thing.fav} location={favProps.location} />
              )}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Things;
