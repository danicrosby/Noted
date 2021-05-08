import React from 'react';
import PropTypes from 'prop-types';

export default function SinglePlayerCard({ children, player }) {
  return (
    <div>
      <h1>{player.name}</h1>
        {children}
    </div>
  );
}

SinglePlayerCard.propTypes = {
  children: PropTypes.any,
  player: PropTypes.object
};
