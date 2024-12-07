import React, { useState } from 'react';

const UserInput = () => {
  const [userInput, setUserInput] = useState({
    initialInvestment: 15000,
    annualInvestment: 3000,
    expectedReturn: 6,
    duration: 10,
  });

  // object: 動態key需要[]包住
  // arrow function: 如果你要回傳一個object那需要({})
  // 因為只有{}他會當成函數體

  function handleInputChange(inputId, newValue) {
    setUserInput((prevValue) => ({
      ...prevValue,
      [inputId]: newValue,
    }));
  }

  return (
    <section id="user-input">
      <div className="user-group">
        <p>
          <label>Initial Investment</label>
          <input
            type="number"
            required
            value={userInput.initialInvestment}
            onChange={(event) =>
              handleInputChange('initialInvestment', event.target.value)
            }
          />
        </p>
        <p>
          <label>Annual Investment</label>
          <input
            type="number"
            required
            value={userInput.annualInvestment}
            onChange={(event) =>
              handleInputChange('annualInvestment', event.target.value)
            }
          />
        </p>
      </div>
      <div className="user-group">
        <p>
          <label>Expected Return</label>
          <input
            type="number"
            required
            value={userInput.expectedReturn}
            onChange={(event) =>
              handleInputChange('expectedReturn', event.target.value)
            }
          />
        </p>
        <p>
          <label>Duration</label>
          <input
            type="number"
            value={userInput.duration}
            onChange={(event) =>
              handleInputChange('duration', event.target.value)
            }
          />
        </p>
      </div>
    </section>
  );
};

export default UserInput;
