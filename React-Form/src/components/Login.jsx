import { useRef } from 'react';
import { useState } from 'react';

export default function Login() {
  // const [enteredValue, setEnteredValue] = useState({
  //   email: '',
  //   password: '',
  // });
  const enteredEmail = useRef();
  const enteredPassword = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(
    //   `email: ${enteredValue.email}, password: ${enteredValue.password}`
    // );
    console.log(
      `email: ${enteredEmail.current.value}, password: ${enteredPassword.current.value}`
    );
  }

  // function handleEnteredValue(id, value) {
  //   setEnteredValue((prev) => ({
  //     ...prev,
  //     [id]: value,
  //   }));
  // }

  return (
    // 在form的button中,default的type都是submit
    // onSubmit: 當form裡面的button.type = submit時會觸發
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            // onChange={(event) =>
            //   handleEnteredValue('email', event.target.value)
            // }
            // value={enteredValue.email}
            ref={enteredEmail}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            // onChange={(event) =>
            //   handleEnteredValue('password', event.target.value)
            // }
            // value={enteredValue.password}
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
