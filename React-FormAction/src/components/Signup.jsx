import { useActionState } from 'react';
import {
  isNotEmpty,
  isEmail,
  isEqualsToOtherValue,
  hasMinLength,
} from '../../../React-Form/src/util/validation';

export default function Signup() {
  function submitSignup(pervData, formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const role = formData.get('role');
    const acquisition = formData.getAll('acquisition');
    const terms = formData.get('terms');

    const errors = [];
    if (!isEmail(email) || !isNotEmpty(email)) {
      errors.push('email error');
    }
    if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
      errors.push('password error');
    }
    if (!isEqualsToOtherValue(password, confirmPassword)) {
      errors.push('password and confirmPassword not match');
    }
    if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
      errors.push('firstName or lastName error');
    }
    if (!isNotEmpty(role)) {
      errors.push('role error');
    }
    console.log(`acquisition: ${acquisition}`);
    if (acquisition.length === 0) {
      errors.push('role error');
    }
    if (!terms) {
      errors.push('terms error');
    }

    if (errors.length !== 0) {
      return { errors };
    }

    return { errors: null };
  }

  // const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
  // state: Fn return value
  // formAction: 調用formAction時,會再次觸發Fn

  // fn: async function
  // initialState: fn的initState
  const [formState, formAction] = useActionState(submitSignup, {
    errors: null,
  });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
