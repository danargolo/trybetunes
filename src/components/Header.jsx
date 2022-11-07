import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Nav from './Nav';

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
        <Nav />
      </header>

    );
  }
}

export default Header;
