import Input from './Input';
import { isEmail, hasMinLength, isNotEmpty } from '../util/validation';
import useInput from '../hooks/useInput';

export default function StateLogin() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  const {
    enteredValue: emailValue,
    handleEnteredValue: handleEnteredEmailValue,
    handleOnBlur: handleEmailOnBlur,
    hasError: emailHasError,
  } = useInput('', (value) => {
    return !isEmail(value) || !isNotEmpty(value);
  });

  const {
    enteredValue: passwordValue,
    handleEnteredValue: handleEnteredPasswordValue,
    handleOnBlur: handlePasswordOnBlur,
    hasError: passwordHasError,
  } = useInput('', (value) => {
    return !hasMinLength(value.trim(), 6) || !isNotEmpty(value.trim());
  });

  return (
    // 在form的button中,default的type都是submit
    // onSubmit: 當form裡面的button.type = submit時會觸發
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          // type="email"
          name="email"
          onBlur={handleEmailOnBlur}
          onChange={(event) => handleEnteredEmailValue(event)}
          value={emailValue}
          error={emailHasError && 'entered email is invalid!'}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordOnBlur}
          onChange={(event) => handleEnteredPasswordValue(event)}
          value={passwordValue}
          error={passwordHasError && 'entered password is invalid!'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
