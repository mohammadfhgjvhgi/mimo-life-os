import React, { useState, useEffect } from 'react';
import { subscribeToParkingSpots, getAvailableSpots, getOccupiedSpots } from '../firebase/database';

const ParkingDashboard = () => {
  const [parkingSpots, setParkingSpots] = useState({});
  const [loading, setLoading] = useState(true);
  const [availableSpots, setAvailableSpots] = useState(0);
  const [occupiedSpots, setOccupiedSpots] = useState(0);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = subscribeToParkingSpots((snapshot) => {
      const spots = snapshot.val();
      setParkingSpots(spots || {});
      
      // Calculate statistics
      setAvailableSpots(getAvailableSpots(spots));
      setOccupiedSpots(getOccupiedSpots(spots));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getStatusColor = (status) => {
    return status === 1 ? 'bg-red-500' : 'bg-green-500';
  };

  const getStatusText = (status) => {
    return status === 1 ? 'Occupied' : 'Available';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading parking data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Smart Parking System</h1>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Available Spots</h2>
            <p className="text-4xl font-bold text-green-500">{availableSpots}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Occupied Spots</h2>
            <p className="text-4xl font-bold text-red-500">{occupiedSpots}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Total Spots</h2>
            <p className="text-4xl font-bold text-blue-500">{Object.keys(parkingSpots).length}</p>
          </div>
        </div>

        {/* Parking Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(parkingSpots).map(([spotId, spot]) => (
            <div 
              key={spotId} 
              className={`bg-white rounded-lg shadow p-4 flex flex-col items-center ${getStatusColor(spot.status)}`}
            >
              <h3 className="text-lg font-semibold mb-2">Spot {spotId.split('_')[1]}</h3>
              <div className={`w-12 h-12 rounded-full ${getStatusColor(spot.status)} mb-2`}></div>
              <p className="text-sm">{getStatusText(spot.status)}</p>
              <p className="text-xs text-gray-500 mt-1">
                Updated: {new Date(spot.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingDashboard;