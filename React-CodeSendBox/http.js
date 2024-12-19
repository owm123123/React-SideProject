export async function fetchGetUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places');
  if (!response.ok) {
    throw new Error('Failed to fetch get user places');
  }
  const data = await response.json();
  return data.places;
}

export async function fetchGetPlaces() {
  const response = await fetch('http://localhost:3000/places');
  if (!response.ok) {
    throw new Error('Failed to fetch get places');
  }
  const data = await response.json();
  return data.places;
}

export async function fetchUpdatePlaces(places) {
  console.log(places);
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places: places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch update places');
  }
  const data = await response.json();
  return data.message;
}
