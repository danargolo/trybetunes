import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Inputs from '../components/Inputs';
import ResultString from '../components/ResultString';
import ArtistResult from '../components/ArtistResult';
import { searchAlbumsAPI } from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    search: '',
    isDisabled: true,
    loading: false,
    artist: '',
    result: [],
    emptyResult: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const minLength = 2;
    this.setState({ [name]: value }, () => (
      value.length < minLength
        ? this.setState({ isDisabled: true })
        : this.setState({ isDisabled: false })
    ));
  };

  searchArtist = (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState({
      search: '',
      loading: true,
    }, () => {
      searchAlbumsAPI(search).then(album => {
        if (album.length < 1) { this.setState({ emptyResult: true }); }
  
        this.setState({
          artist: search,
          isDisabled: true,
          loading: false,
          result: album,
        });
      })
    });

  };

  render() {
    const { search, isDisabled, loading,
      result, artist, emptyResult } = this.state;

    return (
      <div
        data-testid="page-search"
      >
        <Header />
        <Inputs
          search={ search }
          isDisabled={ isDisabled }
          handleChange={ this.handleChange }
          searchArtist={ this.searchArtist }
        />
        { loading && <Loading /> }
        { emptyResult && <h2>Nenhum álbum foi encontrado</h2>}
        <h2>{`Resultado de álbuns de: ${artist}`}</h2>

        { result.map((album, index) => (
          <ArtistResult
            key={ `${index}-${album.collectionId}` }
            album={ album }
          />
        ))}
      </div>
    );
  }
}

export default Search;
