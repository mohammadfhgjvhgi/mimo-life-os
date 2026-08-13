import firebase from 'firebase/app';
import 'firebase/database';
import config from './config';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const database = firebase.database();

// Get parking spots data
export const getParkingSpots = () => {
  return database.ref('parking_spots').once('value');
};

// Update parking spot status
export const updateParkingSpot = (spotId, status) => {
  return database.ref(`parking_spots/${spotId}`).update({
    status: status,
    timestamp: Date.now()
  });
};

// Get real-time updates for parking spots
export const subscribeToParkingSpots = (callback) => {
  return database.ref('parking_spots').on('value', callback);
};

// Calculate available spots
export const getAvailableSpots = (spots) => {
  return Object.values(spots).filter(spot => spot.status === 0).length;
};

// Calculate occupied spots
export const getOccupiedSpots = (spots) => {
  return Object.values(spots).filter(spot => spot.status === 1).length;
};