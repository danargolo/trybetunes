import React from 'react';
import PropTypes from 'prop-types';

class Inputs extends React.Component {
  render() {
    const { search, handleChange, isDisabled, searchArtist } = this.props;

    return (
      <form>
        <input
          data-testid="search-artist-input"
          name="search"
          type="search"
          placeholder="Search..."
          value={ search }
          onChange={ handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ isDisabled }
          onClick={ searchArtist }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

Inputs.propTypes = {
  search: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  searchArtist: PropTypes.func.isRequired,
};

export default Inputs;
