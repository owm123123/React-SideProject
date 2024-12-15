import { useCallback, useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

const storedIds = JSON.parse(localStorage.getItem('selectedPlaces') || []);
// 當兩個 arr要比較時, 可以將一個 arr轉成 map, 再用arr.map(() => map.get())
const placesMap = new Map(AVAILABLE_PLACES.map((place) => [place.id, place]));
const storepickedPlaces = storedIds.map((id) => placesMap.get(id));

// const storepickedPlaces = AVAILABLE_PLACES.filter(
//   (place) => storedIds.indexOf(place.id) !== -1
// );
// const storepickedPlaces = storedIds.map((id) =>
//   AVAILABLE_PLACES.find((price) => price.id === id)
// );

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storepickedPlaces);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // navigator: brower info (類似 window)
  // user info: navigator.userAgent
  // 硬體狀態
  // 離線、上線

  // navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
  // successCallback: (position) => {} (並填) excute when success
  // errorCallback: (error) => {} (選填) execute when error
  // option: () => {} (選填) get position method

  // useEffect(() => {}, []) handle other business (ex: localStorage/call api ...)
  // [] (empty arr): execute function when init render
  // [state1, state1]: execute function when specific state
  // none (not arr): execute function when all state
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    setIsModalOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setIsModalOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if (storedIds.indexOf(id) === -1) {
      console.log('add store success');
      localStorage.setItem(
        'selectedPlaces',
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  // useCallback(() => {}, [])
  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setIsModalOpen(false);

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem(
      'selectedPlaces',
      JSON.stringify(storedIds.filter((id) => id != selectedPlace.current))
    );
  }, []);

  return (
    <>
      <Modal ref={modal} open={isModalOpen} onClose={handleStopRemovePlace}>
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
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
