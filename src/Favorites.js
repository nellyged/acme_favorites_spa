import React from 'react';

const Favorites = props => {
  console.log(props.location.pathname);
  return (
    <ul>
      {props.favs.map(fav => {
        return (
          <li key={fav.id}>
            {`${props.location.pathname}` === '/users'
              ? `${fav.thing.name} (Ranked: ${fav.rank})`
              : `favorited by: ${fav.user.name}`}
          </li>
        );
      })}
    </ul>
  );
};

export default Favorites;
