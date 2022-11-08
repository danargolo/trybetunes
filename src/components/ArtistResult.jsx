import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ArtistResult extends React.Component {
  render() {
    const { album } = this.props;
    const { collectionId, artistName, collectionName, artworkUrl100 } = album;

    return (
      <Link
        to={ `/album/${collectionId}` }
      >
        <div
          className="albumcard"
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h3>{collectionName}</h3>
          <h4>{artistName}</h4>
        </div>
      </Link>
    );
  }
}

ArtistResult.propTypes = {
  // artist: PropTypes.string.isRequired,
  // emptyResult: PropTypes.bool.isRequired,
  album: PropTypes.shape({
    collectionId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArtistResult;
