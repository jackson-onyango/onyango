import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css';

toastr.options = {
  closeButton: true,
  progressBar: true,
};

class Register extends React.Component {
  state = {
    username: '',
    password: '',
  };

  createUser = () => {
    const { username, password } = this.state;
    const { history } = this.props;
    if (!(username.trim() && password.trim())) {
      toastr.error('Please fill in both fields');
      return;
    }
    axios
      .post(
        '/api/auth/register',
        { username, password },
      )
      .then(() => {
        toastr.success('Registered Succesfully, You can now sign in');
        history.push('/auth/signIn');
      })
      .catch(() => {
        toastr.error('Internal Server Error');
      });
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { username, password } = this.state;
    const { history } = this.props;
    return (
      <div className="page">
        <h1> Register </h1>
        <Divider />

        <TextField
          id="username"
          floatingLabelText="Username"
          hintText="Enter Username"
          name="username"
          value={username}
          onChange={this.handleChange}
          style={{ display: 'block' }}
        />

        <TextField
          id="password"
          floatingLabelText="Password"
          name="password"
          type="password"
          hintText="Enter password"
          value={password}
          onChange={this.handleChange}
          style={{ display: 'block' }}
        />

        <RaisedButton
          onClick={this.createUser}
          label="Register"
          primary
          style={{ marginRight: '10px' }}
        />

        <RaisedButton
          onClick={() => history.push('/')}
          label="Cancel"
        />
      </div>
    );
  }
}

Register.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Register;
