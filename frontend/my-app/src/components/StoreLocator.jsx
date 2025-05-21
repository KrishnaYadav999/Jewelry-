import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { FaSearchLocation } from 'react-icons/fa';
import Footer from './Footer';
import Navbar from './Navbar';
import Offer from './Offer';

const StoreLocator = () => {
  const [stores, setStores] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [distance, setDistance] = useState(10); // Default distance in miles

  const googleMapsAPIKey = 'AIzaSyAlsMOI8VjeszLmsS4kwSIKH6C53u4Q_GY'; // Replace with your API Key

  // Store data example (you can fetch from your server instead)
  const storesData = [
    { id: 1, name: 'Store 1', lat: 40.748817, lng: -73.985428, address: '123 Main St, NY', phone: '123-456-7890' },
    { id: 2, name: 'Store 2', lat: 40.749817, lng: -73.987428, address: '456 Market St, NY', phone: '987-654-3210' },
    { id: 3, name: 'Store 3', lat: 40.747817, lng: -73.988428, address: '789 Broadway, NY', phone: '555-555-5555' },
    // Add more stores...
  ];

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
    // Set stores data from the server or use static data
    setStores(storesData);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  const filteredStores = stores.filter((store) => {
    return store.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Calculate distance between user and store using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8; // Radius of Earth in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in miles
    return distance;
  };

  return (
    <>
      <div className="mt-14">
        <Offer />
        <Navbar />
      </div>
      <LoadScript googleMapsApiKey={googleMapsAPIKey}>
        <div className="max-w-screen-lg mx-auto py-8">
          <div className="flex justify-between mb-6 mt-28">
            <div className="flex items-center space-x-4">
              <FaSearchLocation className="text-indigo-600 text-2xl" />
              <input
                type="text"
                placeholder="Search Store..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-4 py-2 rounded-lg shadow-md w-64"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="distance" className="text-lg">Distance (miles)</label>
              <input
                type="number"
                id="distance"
                value={distance}
                onChange={handleDistanceChange}
                className="px-4 py-2 rounded-lg shadow-md"
                min="1"
                max="100"
              />
            </div>
          </div>

          {/* Google Map */}
          <GoogleMap
            mapContainerStyle={{ height: '500px', width: '100%' }}
            center={userLocation || { lat: 40.748817, lng: -73.985428 }}
            zoom={12}
          >
            {userLocation && (
              <Marker position={userLocation} label="You" />
            )}

            {/* Render store markers */}
            {filteredStores.map((store) => {
              const distanceToStore = userLocation
                ? calculateDistance(userLocation.lat, userLocation.lng, store.lat, store.lng)
                : 0;

              if (distanceToStore <= distance) {
                return (
                  <Marker
                    key={store.id}
                    position={{ lat: store.lat, lng: store.lng }}
                    onClick={() => setSelectedStore(store)}
                  />
                );
              }
              return null;
            })}

            {/* Store Info Window */}
            {selectedStore && (
              <InfoWindow
                position={{
                  lat: selectedStore.lat,
                  lng: selectedStore.lng,
                }}
                onCloseClick={() => setSelectedStore(null)}
              >
                <div>
                  <h3 className="font-semibold text-lg">{selectedStore.name}</h3>
                  <p>{selectedStore.address}</p>
                  <p>Phone: {selectedStore.phone}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </LoadScript>
      <Footer />
    </>
  );
};

export default StoreLocator;
