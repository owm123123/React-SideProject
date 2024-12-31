import { useReducer } from 'react';
import { createContext } from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  cleanItems: () => {},
});

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // findIndex() & indexOf() 都是用來查看值有沒有在index中,
      // 如果有回傳index位置, 如果沒有回傳-1
      // 差別
      // findIndex(() => {}) 裡面是放function (可加判斷式或Steam, 但只會回傳第一個值)
      // indexOf() => 裡面是放值
      const existingCartIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const updatedItems = [...state.items];

      if (existingCartIndex === -1) {
        updatedItems.push({ ...action.item, quantity: 1 });
      } else {
        const existingItem = state.items[existingCartIndex];
        const updateItem = {
          // 物件要保留其他的值記得...object (不要忘記)
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartIndex] = updateItem;
      }
      return { ...state, items: updatedItems };
    }
    case 'REMOVE_ITEM': {
      const existingCartIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const updatedItems = [...state.items];

      if (state.items[existingCartIndex].quantity === 1) {
        // slice() & splice() & split()
        // array.slice(begin, end) [end不會被複製] 複製
        // array.splice(start, deleteCount, item1, item2, ...) 添加/刪除項目
        // stringObject.split(separator, howmany) 分割字串成字串組
        //  separator: 字串符或正則表達式，從該參數指定的地方分割stringObject。
        //  howmany: 返回值的最大長度，超過該長度則不顯示。
        updatedItems.splice(existingCartIndex);
      } else {
        const existingItem = state.items[existingCartIndex];
        const updateItem = {
          // 物件要保留其他的值記得...object (不要忘記)
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        updatedItems[existingCartIndex] = updateItem;
      }
      return { ...state, items: updatedItems };
    }

    case 'CLEAN_ITEMS': {
      return { ...state, items: [] };
    }
  }
  return state;
};

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  }

  function cleanItems() {
    dispatchCartAction({ type: 'CLEAN_ITEMS' });
  }

  // 為了給Provider傳送value建立
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    cleanItems,
  };

  console.log(cart);

  return (
    // 記得要給value()
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
