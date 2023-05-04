import { useState, ChangeEvent, FormEvent } from "react";
import { getData, register } from "../../utils/data-utils";
import FormInput from "../../components/form-input";

const defaultFormFields = {
  username: "",
  password: "",
  birthdate: "",
};

const Register = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password, birthdate } = formFields;

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
      await register(username, password, birthdate);
      resetFormFields();
    } catch (error) {
      alert("Registration failed. Please try again later.");
    }
  };

  const reload = () => {
    resetFormFields();
  };

  return (
    <div className="Auth-form-container content-center">
      <form
        className="Auth-form flex flex-col justify-center"
        onSubmit={handleSubmit}
      >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className=" grid grid-cols-1 form-group mt-3 ">
            <FormInput
              label="Username"
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
          <div className="form-group mt-3">
            <FormInput
              label="Birthdate"
              type="date"
              required
              name="birthdate"
              value={birthdate}
              onChange={handleChange}
            />
          </div>
          <div className="button-group">
            <button className="button" type="submit">
              Register
            </button>
            {/*<button type="button" className="button" onClick={reload}>
              Clear
  </button> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;