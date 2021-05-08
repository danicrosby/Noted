import React from 'react';
import PropTypes from 'prop-types';

export default function SinglePlayerCard({ player }) {
  return (
    <div className="single-player-card">
      <h1>{player.name}</h1>
      <h6>{player.instrument}</h6>
      <img src={player.imageUrl}></img>
    </div>
  );
}

SinglePlayerCard.propTypes = {
  children: PropTypes.any,
  player: PropTypes.object
};
