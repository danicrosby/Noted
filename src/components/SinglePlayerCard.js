import React from 'react';
import PropTypes from 'prop-types';

export default function SinglePlayerCard({ player }) {
  return (
    <div>
      <h1>{player.name}</h1>
      <h6>{player.instrument}</h6>
      <img src={player.imageUrl}></img>
    </div>
  );
}

SinglePlayerCard.propTypes = {
  player: PropTypes.object
};
