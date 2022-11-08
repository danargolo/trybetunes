import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { name, previewUrl, trackId, handleCheckbox } = this.props;
    return (
      <div>
        <span>
          {name}
        </span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <input
          id={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          onChange={ handleCheckbox }
          // checked={ checked }
        />
      </div>

    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // checked: PropTypes.bool.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};

export default MusicCard;
