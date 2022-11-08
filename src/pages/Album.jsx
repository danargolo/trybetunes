import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    loading: false,
    // check: {},
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

  handleCheckbox = async (event) => {
    this.setState(() => ({
      loading: true }));
    // check: {...prev.check, [event.target.id]: event.target.checked}}))
    const { musics } = this.state;
    const { id } = event.target;
    const objMusic = musics.find((music) => +id === +music.trackId);
    await addSong(objMusic);

    this.setState(() => ({
      loading: false }));
    // check: {...prev.check}}))
  };

  render() {
    const { musics, album, loading } = this.state;
    const { artistName, collectionName, artworkUrl100 } = album;
    // console.log(musics)

    return (
      <>
        <Header />
        { loading && <Loading />}
        <div>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h2 data-testid="album-name">
            { collectionName }
          </h2>
          <h3 data-testid="artist-name">
            { artistName }
          </h3>
          {musics.map((music, index) => (
            <MusicCard
              key={ index }
              name={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              handleCheckbox={ this.handleCheckbox }
              // checked={ checked }
            />
          ))}
        </div>
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
