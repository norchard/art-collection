import React, { useState, useEffect } from "react";
import ArtworkTile from "./components/ArtworkTile";
import NewEntryForm from "./components/NewEntryForm";
import { v4 as uuidv4 } from "uuid";
import "bootstrap";

function App() {
  const [showForm, setShowForm] = useState(false);
  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const [data, setData] = useState([]);
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
    fetch("http://localhost:8080/artwork/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artwork),
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
          console.log(newData);
          setData(newData);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch("http://localhost:8080/artwork/")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <header style={{ textAlign: "center", margin: "50px" }}>
        <h1>Art Collection</h1>
        <button onClick={toggleShowForm} className="btn btn-primary">
          {showForm ? "Hide New Artwork Form" : "Show New Artwork Form"}
        </button>
        {showForm && <NewEntryForm addNewArtwork={addNewArtwork} />}
      </header>
      {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."} */}
      {data
        ? data
            .sort((a, b) => a._id - b._id)
            .map((artwork) => (
              <ArtworkTile
                key={artwork._id}
                artwork={artwork}
                onDelete={onDelete}
                editArtworkEntry={editArtworkEntry}
              />
            ))
        : "Loading..."}
    </div>
  );
}

export default App;
