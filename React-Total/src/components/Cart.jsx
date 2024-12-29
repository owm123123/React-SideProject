import React, { useContext } from 'react';
import CartContext from '../store/CartContext';
import Modal from './UI/Modal';
import { currencyFormattor } from '../util/formatting';
import Button from './UI/Button';

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.items.reduce((total, item) => total + item, 0);
  return (
    <Modal className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormattor.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly>Close</Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
