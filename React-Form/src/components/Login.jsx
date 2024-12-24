import { useState } from 'react';
import { useRef } from 'react';

export default function Login() {
  const [isInValidEmail, setIsInValidEmail] = useState(false);
  const enteredEmail = useRef();
  const enteredPassword = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    console.log(
      `email: ${enteredEmail.current.value}, password: ${enteredPassword.current.value}`
    );
    const emailValue = enteredEmail.current.value;
    if (!emailValue.includes('@')) {
      setIsInValidEmail(true);
      return;
    }

    setIsInValidEmail(false);
    console.log('Http send...');
  }

  return (
    // 在form的button中,default的type都是submit
    // onSubmit: 當form裡面的button.type = submit時會觸發
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" ref={enteredEmail} />
          <div className="control-error">
            {isInValidEmail && <span>entered email is invalid!</span>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={enteredPassword}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
