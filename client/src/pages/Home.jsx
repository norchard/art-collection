import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });

  // const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.get("token")) {
        navigate("/login");
      }
      fetch("http://localhost:8080", {
        method: "POST",
        headers: {
          Authorization: cookies.get("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const { status, user } = data;
          setUsername(user);
          return status
            ? toast(`Hello ${user}`, { position: "top-right" })
            : (cookies.remove("token"), navigate("/login"));
        });
    };
    verifyCookie();
  });

  const Logout = () => {
    cookies.remove("token");
    navigate("/login");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
