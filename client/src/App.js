import React, { useState, useEffect } from "react";
import ArtworkTile from "./components/ArtworkTile";
import NewEntryForm from "./components/NewEntryForm";
import AuthForms from "./components/AuthForms";
// import { v4 as uuidv4 } from "uuid";
import "bootstrap";
import "./app.css";
import Cookies from "universal-cookie";
import { Route, Routes } from "react-router-dom";
import { Login, Register, Home } from "./pages";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [data, setData] = useState([]);

  const cookies = new Cookies(null, { path: "/" });

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  //   {
  //     id: 0,
  //     artist: "Gustav Klimt",
  //     name: "The Kiss",
  //     medium: "Print of Painting",
  //     date: "1908",
  //     dimensions: '11"x14"',
  //   },
  //   {
  //     id: 1,
  //     artist: "Ryan Putnam",
  //     name: "Chill",
  //     medium: "Risograph Print",
  //     date: "2023",
  //     dimensions: "11 x 14",
  //   },
  //   {
  //     id: 2,
  //     artist: "Ryan Putnam",
  //     name: "Cairne 02",
  //     medium: "Ceramic Tile Mounted on Wood",
  //     date: "2023",
  //     dimensions: "11 x 14",
  //   },
  //   {
  //     id: 3,
  //     artist: "Jessica Hische",
  //     name: "All This and More",
  //     medium: "Letterpress Print",
  //     date: "2023",
  //     dimensions: "11 x 14",
  //   },
  //   {
  //     id: 4,
  //     artist: "Jai Vasicek",
  //     name: "Nim",
  //     medium: "Print of a Painting",
  //     date: "2023",
  //     dimensions: "11 x 14",
  //   },
  //   {
  //     id: 5,
  //     artist: "Anthony Burrill",
  //     name: "You & Me",
  //     medium: "Woodblock Print",
  //     date: "2023",
  //     dimensions: "11 x 14",
  //   },
  // ]);

  const onDelete = (id) => {
    fetch(`http://localhost:8080/artwork/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.deletedCount === 1) {
          const newData = data.filter((artwork) => artwork._id !== id);
          setData(newData);
        }
      })
      .catch((error) => console.error(error));
  };

  const addNewArtwork = (artwork) => {
    // Create an object of formData
    let formData = new FormData();

    // Update the formData object
    for (let key in artwork) {
      formData.append(key, artwork[key]);
    }

    fetch(`http://localhost:8080/artwork/${userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authentication: cookies.get("authToken"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((id) => {
        const newArtwork = { _id: id, ...artwork };
        const newData = [...data, newArtwork];
        setData(newData);
        toggleShowForm();
      });
  };

  const editArtworkEntry = (artwork) => {
    const { _id, ...restOfArtwork } = artwork;
    fetch(`http://localhost:8080/artwork/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restOfArtwork),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.modifiedCount === 1) {
          const removeArtwork = data.filter((item) => item._id !== artwork._id);
          const newData = [...removeArtwork, artwork].sort(
            (a, b) => a._id - b._id
          );
          setData(newData);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleLogin = (e, email, password) => {
    e.preventDefault();
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res from login", res);
        console.log("setting cookie...");

        cookies.set("authToken", res.token, { path: "/" });
        setLoggedIn(true);
        setUserName(res.name);
        console.log("fetching artwork...");
        fetchArtwork();
      })
      .catch((err) => console.err(err));

    console.log(email);
    console.log(password);
  };

  const handleRegister = (e, name, email, password) => {
    e.preventDefault();
    console.log("registering...");
    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
  };

  const fetchArtwork = (userName) => {
    console.log("cookie", cookies.get("authToken"));
    fetch(`http://localhost:8080/artwork/${userName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.get("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        if (data.length === 0) setShowForm(true);
        else setData(data);
      })
      .catch((error) => console.error(error));
  };

  const handleLogout = () => {
    cookies.remove("authToken");
    setLoggedIn(false);
    setUserName("");
    setShowForm(false);
  };

  // useEffect(() => {
  //   fetch("http://localhost:8080/artwork/", {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <div id="App">
      <h1 className="title">Art Collection</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );

  // return (
  //   <div>
  //     <header style={{ textAlign: "center", margin: "50px" }}>
  //       {loggedIn && (
  //         <button
  //           onClick={handleLogout}
  //           className="logout-button btn btn-dark btn-sm"
  //         >
  //           Log Out
  //         </button>
  //       )}
  //       <h1 className="title">{userName && `${userName}'s `}Art Collection</h1>
  //       {!loggedIn && (
  //         <p>
  //           Art Collection is a web application to store information about your
  //           collection of art. <br />
  //           Make an account below and login to get started!
  //         </p>
  //       )}
  //       {!loggedIn && (
  //         <AuthForms
  //           handleLogin={handleLogin}
  //           handleRegister={handleRegister}
  //         />
  //       )}
  //       {loggedIn && (
  //         <button onClick={toggleShowForm} className="btn btn-light btn-sm">
  //           {showForm ? "Hide New Artwork Form" : "Show New Artwork Form"}
  //         </button>
  //       )}
  //       {showForm && <NewEntryForm addNewArtwork={addNewArtwork} />}
  //     </header>
  //     {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."} */}
  //     {loggedIn &&
  //       data &&
  //       data
  //         .sort((a, b) => a._id - b._id)
  //         .map((artwork) => (
  //           <ArtworkTile
  //             key={artwork._id}
  //             artwork={artwork}
  //             onDelete={onDelete}
  //             editArtworkEntry={editArtworkEntry}
  //           />
  //         ))}
  //   </div>
  // );
}

export default App;
