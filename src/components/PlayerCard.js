import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardText,
  CardTitle,
  CardImg
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deletePlayer } from '../helpers/data/PlayerData';
import PlayerForm from './PlayerForm';

const PlayerCard = ({
  firebaseKey,
  name,
  instrument,
  imageUrl,
  setPlayers
}) => {
  const [editing, setEditing] = useState(false);
  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deletePlayer(firebaseKey)
          .then(setPlayers);
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      case 'view':
        history.push(`/players/${firebaseKey}`);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  return (
    <Card body>
      <CardImg className="card-img" top width="100%" src={imageUrl} />
      <CardTitle tag="h5">{name}</CardTitle>
      <CardText>{instrument}</CardText>
      <Button className="buttons" outline size="sm" color="info" onClick={() => handleClick('view')}>Musician Details</Button>
      <Button className="buttons" outline size="sm" color="danger" onClick={() => handleClick('delete')}>Delete Musician</Button>
      <Button className="buttons" outline size="sm" color="secondary" onClick={() => handleClick('edit')}>
        {editing ? 'Close Form' : 'Edit Musician'}
      </Button>
      {
        editing && <PlayerForm
          formTitle='Edit Musician'
          setPlayers={setPlayers}
          firebaseKey={firebaseKey}
          name={name}
          instrument={instrument}
          imageUrl={imageUrl}
        />
      }
    </Card>
  );
};

PlayerCard.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  instrument: PropTypes.string.isRequired,
  setPlayers: PropTypes.func
};

export default PlayerCard;
