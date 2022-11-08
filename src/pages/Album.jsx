import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    album: [],
    musics: [],
  };

  componentDidMount() {
    this.getSong();
  }

  getSong = async () => {
    const { match } = this.props;
    const { id } = match.params;

    const [album, ...musics] = await getMusics(id);

    this.setState({
      album,
      musics,
    });
  };

  render() {
    const { musics, album } = this.state;
    const { artistName, collectionName, artworkUrl100 } = album;

    return (
      <>
        <Header />
        <div>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h2 data-testid="album-name">
            { collectionName }
          </h2>
          <h3 data-testid="artist-name">
            { artistName }
          </h3>
        </div>

        {musics.map((music, index) => (
          <MusicCard
            key={ index }
            name={ music.trackName }
            previewUrl={ music.previewUrl }
          />
        ))}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
