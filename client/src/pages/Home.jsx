import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";
import NewEntryForm from "../components/NewEntryForm";
import { ToastContainer, toast } from "react-toastify";
import ArtworkTile from "../components/ArtworkTile";

const Home = () => {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });

  // const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

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
          // return status
          //   ? toast(`Hello ${user}`, { position: "top-right" })
          //   : (cookies.remove("token"), navigate("/login"));
        });
    };
    verifyCookie();

    const fetchArtwork = (user) => {
      // console.log("cookie", cookies.get("authToken"));
      fetch(`http://localhost:8080/artwork/${user}`, {
        method: "GET",
        headers: {
          Authorization: cookies.get("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data: ", data);
          // if (data.length === 0) setShowForm(true);
          // else setData(data);
        })
        .catch((error) => console.error(error));
    };
    fetchArtwork(username);
  });

  // const editArtworkEntry = (artwork) => {
  //   const { _id, ...restOfArtwork } = artwork;
  //   fetch(`http://localhost:8080/artwork/${_id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(restOfArtwork),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.modifiedCount === 1) {
  //         const removeArtwork = data.filter((item) => item._id !== artwork._id);
  //         const newData = [...removeArtwork, artwork].sort(
  //           (a, b) => a._id - b._id
  //         );
  //         setData(newData);
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // };

  // const onDelete = (id) => {
  //   fetch(`http://localhost:8080/artwork/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.deletedCount === 1) {
  //         const newData = data.filter((artwork) => artwork._id !== id);
  //         setData(newData);
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // };

  const Logout = () => {
    cookies.remove("token");
    navigate("/login");
  };

  const addNewArtwork = (artwork) => {
    // Create an object of formData
    let formData = new FormData();

    // Update the formData object
    for (let key in artwork) {
      formData.append(key, artwork[key]);
    }

    fetch(`http://localhost:8080/artwork/${username}`, {
      method: "POST",
      header: {
        "Content-Type": "multipart/form-data",
        Authorization: cookies.get("token"),
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

  const onDelete = (id) => {
    fetch(`http://localhost:8080/artwork/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: cookies.get("token"),
      },
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

  const editArtworkEntry = (artwork) => {
    const { _id, ...restOfArtwork } = artwork;
    fetch(`http://localhost:8080/artwork/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("token"),
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

  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button className="logout-button btn btn-sm btn-dark" onClick={Logout}>
          Logout
        </button>

        <button onClick={toggleShowForm} className="btn btn-light btn-sm">
          {showForm ? "Hide New Artwork Form" : "Show New Artwork Form"}
        </button>
        {showForm && <NewEntryForm addNewArtwork={addNewArtwork} />}
        {/* {data.length > 0 ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        "Loading..."
      )} */}
        {data
          .sort((a, b) => a._id - b._id)
          .map((artwork) => (
            <ArtworkTile
              key={artwork._id}
              artwork={artwork}
              onDelete={onDelete}
              editArtworkEntry={editArtworkEntry}
            />
          ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;