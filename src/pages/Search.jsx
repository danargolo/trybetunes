import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Inputs from '../components/Inputs';
import ResultString from '../components/ResultString';
import ArtistResult from '../components/ArtistResult';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    search: '',
    isDisabled: true,
    loading: false,
    artist: '',
    result: [],
    emptyResult: false,
    showResultString: false,
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

  searchArtist = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState({
      search: '',
      loading: true,
    });
    const result = await searchAlbumsAPI(search);

    this.setState({
      artist: search,
      isDisabled: true,
      loading: false,
      result,
      showResultString: true,
    }, () => (
      result.length < 1
        ? this.setState({ emptyResult: true })
        : this.setState({ emptyResult: false })
    ));
  };

  render() {
    const { search, isDisabled, loading,
      result, artist, emptyResult, showResultString } = this.state;

    return (
      <div
        data-testid="page-search"
      >
        <Header />
        { loading && <Loading /> }
        { loading
          || <Inputs
            search={ search }
            isDisabled={ isDisabled }
            handleChange={ this.handleChange }
            searchArtist={ this.searchArtist }
          />}
        { showResultString && <ResultString
          artist={ artist }
          emptyResult={ emptyResult }
        />}
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
