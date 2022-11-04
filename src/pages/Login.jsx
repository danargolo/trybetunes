import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    name: '',
    isDisabled: true,
    loading: false,
    redirect: false,
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    const minLength = 3;
    this.setState({ [name]: value }, () => (
      value.length >= minLength
        ? this.setState({ isDisabled: false })
        : this.setState({ isDisabled: true })
    ));
  };

  submitNameUser = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    const { name, isDisabled, loading, redirect } = this.state;

    if (loading) { return <Loading />; }
    if (redirect) { return <Redirect to="/search" />; }

    return (
      <div>
        <div
          data-testid="page-login"
        >
          <label htmlFor="name">
            <input
              type="text"
              data-testid="login-name-input"
              id="name"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
            />
            Login
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isDisabled }
            onClick={ this.submitNameUser }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
