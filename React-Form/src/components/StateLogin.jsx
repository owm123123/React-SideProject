import { useState } from 'react';
import Input from './Input';

export default function StateLogin() {
  const [enteredValue, setEnteredValue] = useState({
    email: '',
    password: '',
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(
      `email: ${enteredValue.email}, password: ${enteredValue.password}`
    );
  }

  function handleOnBlur(id) {
    setDidEdit((prev) => ({
      ...prev,
      [id]: true,
    }));
  }

  function handleEnteredValue(id, value) {
    setEnteredValue((prev) => ({
      ...prev,
      [id]: value,
    }));
    setDidEdit((prev) => ({
      ...prev,
      [id]: false,
    }));
  }

  const isInValidEmail =
    didEdit.email === true && !enteredValue.email.includes('@');
  const isInValidPwd =
    didEdit.password === true && !enteredValue.password.trim().length() > 6;

  return (
    // 在form的button中,default的type都是submit
    // onSubmit: 當form裡面的button.type = submit時會觸發
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleOnBlur('email')}
          onChange={(event) => handleEnteredValue('email', event.target.value)}
          value={enteredValue.email}
          error={isInValidEmail && 'entered email is invalid!'}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleOnBlur('password')}
          onChange={(event) =>
            handleEnteredValue('password', event.target.value)
          }
          value={enteredValue.password}
          error={isInValidPwd && 'entered password is invalid!'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
