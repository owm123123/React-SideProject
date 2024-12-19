import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchGetPlaces } from '../../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function getPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchGetPlaces();
        setAvailablePlaces(places);
        navigator.geolocation.getCurrentPosition((position) => {
          const sortPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({ message: error.message || 'Failed to get all place' });
      }
      setIsFetching(false);
    }
    getPlaces();
  }, []);

  if (error) {
    return <Error title={'Sorry... Fail Occurred'} message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      fallbackText="places is loading..."
      onSelectPlace={onSelectPlace}
    />
  );
}
