import React from 'react';
import Modal from './UI/Modal';
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import { currencyFormattor } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const userProgressCtx = useContext(UserProgressContext);
  function handleOnClose() {
    userProgressCtx.hideCheckout();
  }

  async function handleSubmit(event) {
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    console.log(cartCtx.items);
    console.log(customerData);

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });
  }

  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={userProgressCtx.progress === 'checkout' ? handleOnClose : null}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormattor.format(totalPrice)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleOnClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
