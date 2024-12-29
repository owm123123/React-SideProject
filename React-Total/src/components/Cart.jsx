import React, { useContext } from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import Modal from './UI/Modal';
import Button from './UI/Button';
import { currencyFormattor } from '../util/formatting';

export default function Cart() {
  const cartCtx = useContext(CartContext);
  // 使用reduce的時候,出現NAN可以先檢查是否為數字。
  const totalPrice = cartCtx.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const userProgressCtx = useContext(UserProgressContext);
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
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
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
