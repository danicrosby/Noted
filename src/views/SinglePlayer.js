import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SinglePlayerCard from '../components/SinglePlayerCard';
import { getSinglePlayer } from '../helpers/data/PlayerData';

export default function SinglePlayer() {
  const [player, setPlayer] = useState({});
  const { firebaseKey } = useParams();

  useEffect(() => {
    getSinglePlayer(firebaseKey)
      .then(setPlayer);
  }, []);

  return (
    <div className="single-player-card-container">
      <SinglePlayerCard player={player}>
        <h2>{player.name}</h2>
        <h3>{player.instrument}</h3>
        <h3>{player.imageUrl}</h3>
      </SinglePlayerCard>
    </div>
  );
}
