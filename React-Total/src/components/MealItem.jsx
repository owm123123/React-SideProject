import React, { useContext } from 'react';
import { currencyFormattor } from '../util/formatting';
import Button from './UI/Button';
import CartContext from '../store/CartContext';

export default function MealItem({ meal }) {
  const cartctx = useContext(CartContext);
  function handleAddCart(meal) {
    cartctx.addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormattor.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.decription}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => handleAddCart(meal)}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
