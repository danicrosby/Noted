import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPlayers = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/player.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const addPlayer = (obj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/player.json`, obj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/player/${response.data.name}.json`, body)
        .then(() => {
          getPlayers().then((playersArray) => resolve(playersArray));
        });
    }).catch((error) => reject(error));
});

const deletePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/player/${firebaseKey}.json`)
    .then(() => getPlayers().then((playerArray) => resolve(playerArray)))
    .catch((error) => reject(error));
});

const updatePlayer = (player) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/player/${player.firebaseKey}.json`, player)
    .then(() => getPlayers().then(resolve))
    .catch((error) => reject(error));
});

const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/player/${firebaseKey}.json`)
    .then((player) => resolve(player.data))
    .catch((error) => reject(error));
});

export {
  addPlayer, getPlayers, deletePlayer, updatePlayer, getSinglePlayer
};
