import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { getData } from "../../utils/data-utils";
import FormInput from "../../components/form-input";
import "./login.css";
import Layout from "../../layout/loggedOut/layout";
import LogoBlack from "../../img/logo-black.png";
import { redirect, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { fetchRestEndpoint } from "../../utils/client-server";
import { Request, Response } from "express";

const defaultFormFields = {
  username: "",
  password: "",
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password } = formFields;
  const navigate = useNavigate();
  const signIn = useSignIn();

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
      const data = JSON.parse(
        `{"username": "${username}", "password": "${password}"}`
      );

      const response = await fetchRestEndpoint(
        "http://localhost:8000/users/login",
        "POST",
        data
      );

      const token: string = JSON.stringify(await response.json());

      signIn({
        token: token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { username: username },
      });

      resetFormFields();
      navigate("../dashboard");
    } catch (error) {
      alert("User Login Failed");
    }
  };

  const reload = () => {
    resetFormFields();
  };

  return (
    <Layout>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <img className="logo" src={LogoBlack} />
            <h3 className="Auth-form-title">Log In</h3>
            <div className="flex justify-center flex-col">
              <div className="form-group mt-3">
                <FormInput
                  label="username"
                  placeholder="Username"
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
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="button-group">
              <button className="mt-5 rounded-lg bg-orange-400" type="submit">
                Log In
              </button>
            </div>

            <p className="forgot-password text-right mt-6">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
