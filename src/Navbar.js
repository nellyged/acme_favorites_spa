import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = routeProps => {
  const pathName = routeProps.location.pathname;
  return (
    <ul className="nav nav-pills">
      {Object.keys(routeProps.tabs).map(key => {
        return (
          <li className="nav-item" key={key}>
            <Link
              to={`/${key}`}
              className={`nav-link${`/${key}` === pathName ? ' active' : ''}`}
            >{`${key} ${routeProps.tabs[key]}`}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navbar;
