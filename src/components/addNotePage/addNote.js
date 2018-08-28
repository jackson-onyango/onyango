import React from 'react';
import axios from 'axios';

import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class AddNote extends React.Component {
  state = {
    title: '',
    content: '',
    token: localStorage.getItem('token'),
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  createNote =() => {
    const { title, content, token } = this.state;
    const payload = { title, content };
    axios.post('/api/notes', payload, { headers: { authorization: `Bearer ${token}` } })
      .then(() => {
        console.log('Note Added Succesfully');
        this.props.history.push('/notes');
      })
      .catch(error => console.error(error));
  }

  render() {
    const { title, content } = this.state;
    return (
      <div className="page">
        <h1> Add Note </h1>
        <Divider />
        <TextField
          floatingLabelText="Title"
          id="title"
          name="title"
          value={title}
          fullWidth
          onChange={this.handleChange}
          style={{ display: 'block' }}
        />

        <TextField
          floatingLabelText="Content"
          id="content"
          name="content"
          value={content}
          multiLine
          rows={3}
          fullWidth
          onChange={this.handleChange}
          style={{ display: 'block', border: '1px solid whitesmoke', borderBottom: 'none' }}
        />

        <RaisedButton
          onClick={this.createNote}
          label="Add Note"
          primary
          style={{ marginRight: '10px' }}
        />
        <RaisedButton
          onClick={() => this.props.history.push('/notes')}
          label="Cancel"
        />
      </div>
    );
  }
}

export default AddNote;
