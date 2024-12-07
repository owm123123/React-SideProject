import { useState } from 'react';
import Header from './components/Header';
import Result from './components/Result';
import UserInput from './components/UserInput';

function App() {
  // 將 userInput & handleInputChange搬到 app.jsx
  // 因為userInput改變時下面的Result component改變
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 3000,
    expectedReturn: 6,
    duration: 10,
  });

  // object: 動態key需要[]包住
  // arrow function: 如果你要回傳一個object那需要({})
  // 因為只有{}他會當成函數體
  // 兩種寫法
  // ((prev) => {return{}}) or ((prev) => ({}))

  // +: 一元加號操作符（Unary Plus Operator）
  // +"32" => 32 / +"32.4" => 32.4 / +null => 0 / +"abc" => NaN

  function handleInputChange(inputId, newValue) {
    setUserInput((prevValue) => ({
      ...prevValue,
      [inputId]: +newValue,
    }));
  }

  function isValidDuration() {
    return userInput.duration > 0;
  }

  return (
    <>
      <Header />
      <UserInput onChange={handleInputChange} userInput={userInput} />
      {!isValidDuration() && (
        <p className="center">Please check Duration greater than 0</p>
      )}
      {isValidDuration() && <Result input={userInput} />}
    </>
  );
}

export default App;
