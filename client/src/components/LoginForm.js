import React, { Fragment, useState } from "react";

const LoginForm = (params) => {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Fragment>
      <form style={{ width: 300, margin: "auto" }}>
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
          type="text"
        />
        <button
          type="submit"
          className="btn btn-success"
          onClick={(e) => {
            register
              ? params.handleRegister(e, email, password)
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
