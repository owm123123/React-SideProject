import Header from './components/Header';
import Meals from './components/Meals';
import { CartContextProvide } from './store/CartContext';

function App() {
  return (
    <CartContextProvide>
      <Header />
      <Meals />
    </CartContextProvide>
  );
}

export default App;
