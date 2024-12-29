import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('http://localhost:3000/meals');
      if (!response.ok) {
        //...
      }
      const meals = await response.json();
      // console.log(meals);
      setLoadedMeals(meals);
    }
    fetchMeals();
  }, []);
  console.log(loadedMeals);

  return (
    <ul>
      {loadedMeals.map((meal) => {
        return (
          <li key={meal.id}>
            <span>{meal.name}</span>
          </li>
        );
      })}
    </ul>
  );
}
