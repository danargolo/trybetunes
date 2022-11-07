import React from 'react';
import PropTypes from 'prop-types';

class ResultString extends React.Component {
  render() {
    const { emptyResult, artist } = this.props;

    return (
      (emptyResult
        ? <h2>Nenhum álbum foi encontrado</h2>
        : <h2>{`Resultado de álbuns de: ${artist}`}</h2>)

    );
  }
}

ResultString.propTypes = {
  artist: PropTypes.string.isRequired,
  emptyResult: PropTypes.bool.isRequired,
};

export default ResultString;
