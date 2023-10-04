import React, { Fragment, useState } from "react";

const LoginForm = (params) => {
  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Fragment>
      <form style={{ width: 300, margin: "auto" }}>
        {register && (
          <Fragment>
            <label htmlFor="Name">Name: </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="form-control form-control-sm"
              name="Name"
              type="text"
            />
          </Fragment>
        )}
        <label htmlFor="Email">Email: </label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="form-control form-control-sm"
          name="Email"
          type="text"
        />
        <label htmlFor="Password">Password: </label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="form-control form-control-sm"
          name="Password"
          type="password"
        />
        <button
          type="submit"
          className="btn btn-success"
          onClick={(e) => {
            register
              ? params.handleRegister(e, name, email, password)
              : params.handleLogin(e, email, password);
          }}
        >
          {register ? "Register" : "Login"}
        </button>
      </form>
      <button
        className="btn btn-small btn-light"
        onClick={() => setRegister(!register)}
      >
        {register ? "Login" : "Register"}
      </button>
    </Fragment>
  );
};

export default LoginForm;
