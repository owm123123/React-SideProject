import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUpdatePlaces, fetchGetUserPlaces } from '../http.js';
import Error from './components/Error.jsx';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [updatePlacesError, setUpdatePlacesError] = useState();

  const [isFetching, setIsFetching] = useState(true);

  const [fetchUserPlacesError, setFetchUserPlacesError] = useState();

  useEffect(() => {
    setIsFetching(true);
    async function getUserPlaces() {
      try {
        const places = await fetchGetUserPlaces();
        setUserPlaces(places);
        setIsFetching(false);
      } catch (error) {
        setFetchUserPlacesError((prev) => ({
          ...prev,
          message: error.message || 'Failed to user places',
        }));
        setIsFetching(false);
      }
    }
    getUserPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      console.log([selectedPlace, ...userPlaces]);
      await fetchUpdatePlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setUpdatePlacesError((prop) => ({
        ...prop,
        message: error.message || 'Failed to update place',
      }));
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    let prevPlaces = [];
    setUserPlaces((prevPickedPlaces) => {
      prevPlaces = [...prevPickedPlaces];
      return prevPickedPlaces.filter(
        (place) => place.id !== selectedPlace.current.id
      );
    });

    try {
      await fetchUpdatePlaces(
        prevPlaces.filter((place) => {
          console.log(place.id);
          return place.id !== selectedPlace.current.id;
        })
      );
    } catch (error) {
      setUserPlaces(prevPlaces);
      setUpdatePlacesError((prev) => ({
        ...prev,
        message: error.message || 'Failed to delete place',
      }));
    }

    setModalIsOpen(false);
  }, []);

  function handleUpdatePlacesError() {
    setUpdatePlacesError();
  }

  return (
    <>
      <Modal open={updatePlacesError} onClose={handleUpdatePlacesError}>
        <Error
          title={'Sorry... Fail Occurred'}
          message={updatePlacesError?.message}
          onConfirm={handleUpdatePlacesError}
        />
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {!fetchUserPlacesError ? (
          <Places
            title="I'd like to visit ..."
            isLoading={isFetching}
            fallbackText="places is loading..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        ) : (
          <Error
            title={'Sorry... Fail Occurred'}
            message={fetchUserPlacesError?.message}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
