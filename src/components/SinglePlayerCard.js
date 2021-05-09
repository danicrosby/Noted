import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardTitle,
  CardImg
} from 'reactstrap';

export default function SinglePlayerCard({ player }) {
  return (
    <Card body className="single-card">
    <CardTitle tag="h5">{player.name}</CardTitle>
    <CardText>{player.instrument}</CardText>
    <CardImg className="card-img" top width="100%" src={player.imageUrl} />
    </Card>
  );
}

SinglePlayerCard.propTypes = {
  children: PropTypes.any,
  player: PropTypes.object
};
