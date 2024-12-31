import React from 'react';
import Modal from './UI/Modal';
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import { currencyFormattor } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';
import Error from './Error';

export default function Checkout() {
  const { data, isLoading, error, sendRequest, cleanData } = useHttp(
    'http://localhost:3000/orders',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const userProgressCtx = useContext(UserProgressContext);
  function handleOnClose() {
    userProgressCtx.hideCheckout();
  }

  function handleOnFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.cleanItems();
    cleanData();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let action = (
    <>
      <Button type="button" textOnly onClick={handleOnClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    action = 'loading...';
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleOnFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleOnFinish}>Okey</Button>
        </p>
      </Modal>
    );
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

        {error && <Error title="Failed to fetch order" message={error} />}

        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}
