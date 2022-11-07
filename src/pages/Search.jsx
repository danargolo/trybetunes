import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Inputs from '../components/Inputs';
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

  onInputChange = (event) => {
    const { name, value } = event.target;
    const minLength = 2;
    this.setState({ [name]: value }, () => (
      value.length < minLength
        ? this.setState({ isDisabled: true })
        : this.setState({ isDisabled: false })
    ));
  };

  searchArtist = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState({
      search: '',
      loading: true,
    });
    const result = await searchAlbumsAPI(search);

    if (result.length < 1) { this.setState({ emptyResult: true }); }

    this.setState({
      isDisabled: true,
      loading: false,
      artist: search,
      result,
    });
  };

  render() {
    const { search, isDisabled, loading,
      result, artist, emptyResult } = this.state;

    return (
      <>
        <div
          data-testid="page-search"
        >
          <Header />
          { (loading
            ? <Loading />
            : <Inputs
                search={ search }
                isDisabled={ isDisabled }
                onInputChange={ this.onInputChange }
                searchArtist={ this.searchArtist }
            />)}
        </div>
        { emptyResult && <h2>Nenhum álbum foi encontrado</h2>}
        <h2>{`Resultado de álbuns de: ${artist}`}</h2>
        { result.map((album, index) => (
          <ArtistResult
            key={ index }
            album={ album }
          />
        ))}
      </>
    );
  }
}

export default Search;
