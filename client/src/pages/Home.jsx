import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import NewEntryForm from "../components/NewEntryForm";
import { ToastContainer, toast } from "react-toastify";
import ArtworkTile from "../components/ArtworkTile";

const Home = () => {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
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
          if (!status) {
            cookies.remove("token");
            navigate("/login");
          }
          // return status
          //   ? toast(`Hello ${user}`, { position: "top-right" })
          //   : (cookies.remove("token"), navigate("/login"));
        });
    };
    verifyCookie();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/artwork/`, {
      method: "GET",
      headers: {
        Authorization: cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) setData(res);
        else setShowForm(true);
      })
      .catch((error) => console.error(error));
  }, [username]);

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

    fetch("http://localhost:8080/artwork/", {
      method: "POST",
      headers: {
        Authorization: cookies.get("token"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        const { id, imageKey } = res;
        const newArtwork = { _id: id, ...artwork, image: imageKey };
        const newData = [...data, newArtwork];
        setData(newData);

        toggleShowForm();
      })
      .catch((err) => {
        console.log(err);
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
        <h4 className="light-text">
          Welcome <span>{username}</span>
        </h4>
        <button className="logout-button btn btn-sm btn-dark" onClick={Logout}>
          Logout
        </button>

        <button onClick={toggleShowForm} className="btn btn-light btn-sm">
          {showForm ? "Hide New Artwork Form" : "Show New Artwork Form"}
        </button>
        {showForm && <NewEntryForm addNewArtwork={addNewArtwork} />}
        <div id="artwork-container">
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
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
