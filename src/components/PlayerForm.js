import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { addPlayer, updatePlayer } from '../helpers/data/PlayerData';

const PlayerForm = ({
  formTitle,
  setPlayers,
  name,
  instrument,
  imageUrl,
  firebaseKey
}) => {
  const [player, setPlayer] = useState({
    name: name || '',
    instrument: instrument || '',
    imageUrl: imageUrl || '',
    firebaseKey: firebaseKey || null
  });
  const history = useHistory();

  const handleInputChange = (e) => {
    setPlayer((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.firebaseKey) {
      updatePlayer(player).then(setPlayers);
    } else {
      addPlayer(player).then((response) => {
        setPlayers(response);
        history.push('/players');
      });

      setPlayer({
        name: '',
        instrument: '',
        imageUrl: 0,
        firebaseKey: null
      });
    }
  };

  return (
    <div className='player-form-container'>
      <Form className="player-form" id='addPlayerForm' autoComplete='off' onSubmit={handleSubmit}>
        <h4>{formTitle}</h4>
        <FormGroup className="form-field">
          <Label for="name">Enter Musician Name:</Label>
          <Input
            name='name'
            id='name'
            value={player.name}
            type='text'
            placeholder=''
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup className="form-field">
          <Label for="instrument">Enter Instrument:</Label>
          <Input
            name='instrument'
            id='instrument'
            value={player.instrument}
            type='text'
            placeholder=''
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup className="form-field">
          <Label for="imageUrl">ImageUrl:</Label>
          <Input
            name='imageUrl'
            id='imageUrl'
            value={player.imageUrl}
            type='url'
            placeholder=''
            onChange={handleInputChange}
          />
        </FormGroup>

        <Button className="submit-btn"size="sm" type='submit'>Submit</Button>
      </Form>
    </div>
  );
};

PlayerForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setPlayers: PropTypes.func,
  name: PropTypes.string,
  instrument: PropTypes.string,
  imageUrl: PropTypes.number,
  firebaseKey: PropTypes.string
};

export default PlayerForm;
