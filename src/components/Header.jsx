import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    loading: true,
    name: '',
  };

  loadUserData = async () => {
    const userData = await getUser();
    this.setState({
      loading: false,
      name: userData.name });
  };

  render() {
    const { loading, name } = this.state;
    this.loadUserData();
    if (loading) { return <Loading />; }

    return (
      <header
        data-testid="header-component"
      >
        <p>Trybe Tunes</p>
        <span
          data-testid="header-user-name"
        >
          { `Seja bem-vindo ${name}.` }
        </span>
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
      </header>

    );
  }
}

export default Header;
