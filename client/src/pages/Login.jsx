import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const cookies = new Cookies(null, { path: "/" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.email || !inputValue.password) {
      alert("Please fill in all fields.");
      return;
    }

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) throw new Error(res.message);
        else {
          cookies.set("token", res.token, { path: "/" });
          handleSuccess(res.message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch((err) => {
        handleError(err.message);
      });

    // try {
    //   const { data } = await axios.post(
    //     "http://localhost:4000/login",
    //     {
    //       ...inputValue,
    //     },
    //     { withCredentials: true }
    //   );
    //   console.log(data);
    //   const { success, message } = data;
    //   if (success) {
    //     handleSuccess(message);
    //     setTimeout(() => {
    //       navigate("/");
    //     }, 1000);
    //   } else {
    //     handleError(message);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="form-control"
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button className="form-control btn btn-success" type="submit">
          Submit
        </button>
        <span>
          Need to create an account? <Link to={"/register"}>Register</Link>
        </span>
      </form>
      <ToastContainer style />
    </div>
  );
};

export default Login;
