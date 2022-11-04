import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <Link
          data-testid="link-to-search"
          to="/search"
        >
          Pesquisa
        </Link>
        <Link
          data-testid="link-to-favorites"
          to="/favorites"
        >
          Favoritos
        </Link>
        <Link
          data-testid="link-to-profile"
          to="/profile"
        >
          Perfil
        </Link>
      </nav>
    );
  }
}

export default Nav;
