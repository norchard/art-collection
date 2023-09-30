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

  const [data, setData] = useState([
    {
      id: 0,
      artist: "Gustav Klimt",
      name: "The Kiss",
      medium: "Print of Painting",
      date: "1908",
      dimensions: '11"x14"',
    },
    {
      id: 1,
      artist: "Ryan Putnam",
      name: "Chill",
      medium: "Risograph Print",
      date: "2023",
      dimensions: "11 x 14",
    },
    {
      id: 2,
      artist: "Ryan Putnam",
      name: "Cairne 02",
      medium: "Ceramic Tile Mounted on Wood",
      date: "2023",
      dimensions: "11 x 14",
    },
    {
      id: 3,
      artist: "Jessica Hische",
      name: "All This and More",
      medium: "Letterpress Print",
      date: "2023",
      dimensions: "11 x 14",
    },
    {
      id: 4,
      artist: "Jai Vasicek",
      name: "Nim",
      medium: "Print of a Painting",
      date: "2023",
      dimensions: "11 x 14",
    },
    {
      id: 5,
      artist: "Anthony Burrill",
      name: "You & Me",
      medium: "Woodblock Print",
      date: "2023",
      dimensions: "11 x 14",
    },
  ]);

  const onDelete = (id) => {
    const newData = data.filter((artwork) => artwork.id !== id);
    setData(newData);
  };

  const addNewArtwork = (artwork) => {
    const newArtwork = { id: uuidv4(), ...artwork };
    const newData = [...data, newArtwork];
    console.log(newArtwork);
    setData(newData);
    fetch("http://localhost:8080/artwork/", {
      method: "POST",
      body: newArtwork,
    });
    toggleShowForm();
  };

  const editArtworkEntry = (artwork) => {
    const removeArtwork = data.filter((item) => item.id !== artwork.id);
    setData([...removeArtwork, { ...artwork }]);
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
            .sort((a, b) => a.id - b.id)
            .map((artwork) => (
              <ArtworkTile
                key={artwork.id}
                id={artwork.id}
                artist={artwork.artist}
                name={artwork.name}
                medium={artwork.medium}
                dimensions={artwork.dimensions}
                date={artwork.date}
                onDelete={onDelete}
                editArtworkEntry={editArtworkEntry}
              />
            ))
        : "Loading..."}
    </div>
  );
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
