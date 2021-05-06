import React from 'react';
import PropTypes from 'prop-types';
import PlayerCard from '../components/PlayerCard';

function Players({ players, setPlayerDatas }) {
  return (
    <>
      <div className="card-container">
        {players.map((playerInfo) => (
          <PlayerCard
            key={playerInfo.firebaseKey}
            firebaseKey={playerInfo.firebaseKey}
            name={playerInfo.name}
            teacher={playerInfo.teacher}
            grade={Number(playerInfo.grade)}
            setPlayers={setPlayers}
          />
        ))}
      </div>
    </>
  );
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  setplayers: PropTypes.func.isRequired
};

export default Players;
