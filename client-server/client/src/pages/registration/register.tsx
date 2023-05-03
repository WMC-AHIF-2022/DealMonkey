import { useState, ChangeEvent, FormEvent } from "react";
import { getData } from "../../utils/data-utils";
import FormInput from "../../components/form-input";

const defaultFormFields = {
  username: "",
  password: "",
};

const Register = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password } = formFields;

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // make the API call
      await getData(username, password);
      resetFormFields();
    } catch (error) {
      alert("User Login Failed");
    }
  };

  const reload = () => {
    resetFormFields();
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <FormInput
              label="username"
              type="username"
              required
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <FormInput
              label="Password"
              type="password"
              required
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="button-group">
            <button className="button" type="submit">
              Sign In
            </button>
            <span>
              <button type="button" onClick={reload}>
                Clear
              </button>
            </span>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
