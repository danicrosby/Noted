import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { addPlayer, updatePlayer } from '../helpers/data/PlayerData';

const PlayerForm = ({
  formTitle,
  setPlayers,
  name,
  position,
  uid,
  firebaseKey
}) => {
  const [player, setplayer] = useState({
    name: name || '',
    position: position || '',
    uid: uid || 0,
    firebaseKey: firebaseKey || null
  });
  const history = useHistory();

  const handleInputChange = (e) => {
    setplayer((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === 'uid' ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.firebaseKey) {
      updatePlayer(player).then(setPlayer);
    } else {
      addPlayer(player).then((response) => {
        setPlayer(response);
        history.push('/players');
      });

      setplayer({
        name: '',
        position: '',
        uid: 0,
        firebaseKey: null
      });
    }
  };

  return (
    <div className='player-form'>
      <Form id='addPlayerForm' autoComplete='off' onSubmit={handleSubmit}>
        <h2>{formTitle}</h2>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            name='name'
            id='name'
            value={player.name}
            type='text'
            placeholder='Enter a Player Name'
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="position">Position:</Label>
          <Input
            name='position'
            id='position'
            value={player.position}
            type='text'
            placeholder='Enter a position Name'
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="uid">UID:</Label>
          <Input
            name='uid'
            id='uid'
            value={player.uid}
            type='number'
            placeholder='Enter a uid'
            onChange={handleInputChange}
          />
        </FormGroup>

        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
};

PlayerForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setPlayer: PropTypes.func,
  name: PropTypes.string,
  position: PropTypes.string,
  uid: PropTypes.number,
  firebaseKey: PropTypes.string
};

export default PlayerForm;
