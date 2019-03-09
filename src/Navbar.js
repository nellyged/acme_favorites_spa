import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = routeProps => {
  const pathName = routeProps.location.pathname;
  //I notice that when I refresh my page this gets printed twice. I'm not really sure why
  //console.log(pathName);
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
