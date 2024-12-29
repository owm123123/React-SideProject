import { createContext } from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

export function CartContextProvide({ children }) {
  return <CartContext.Provider>{children}</CartContext.Provider>;
}

export default CartContext;
