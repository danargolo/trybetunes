import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    search: '',
    isDisabled: true,
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    const minLength = 2;
    this.setState({ [name]: value }, () => (
      value.length >= minLength
        ? this.setState({ isDisabled: false })
        : this.setState({ isDisabled: true })
    ));
  };

  render() {
    const { search, isDisabled } = this.state;
    return (
      <>
        <Header />
        <div
          data-testid="page-search"
        >
          <form>
            <input
              data-testid="search-artist-input"
              name="search"
              type="search"
              placeholder="Search..."
              value={ search }
              onChange={ this.onInputChange }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isDisabled }
              // onClick={ searchArtist }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
