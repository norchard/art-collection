import React, { useState } from "react";
import ArtworkTile from "./components/ArtworkTile";
import "bootstrap";

function App() {
  const [data, setData] = useState([
    {
      id: 1,
      artist: "Gustav Klimt",
      name: "The Kiss",
      medium: "Print of Painting",
      date: "1908",
      dimensions: '11"x14"',
    },
    {
      id: 2,
      artist: "Ryan Putnam",
      name: "Chill",
      medium: "Risograph Print",
      date: "2023",
      dimensions: "11 x 14",
    },
    {
      id: 3,
      artist: "Ryan Putnam",
      name: "Cairne 02",
      medium: "Ceramic Tile Mounted on Wood",
      date: "2023",
      dimensions: "11 x 14",
    },
    {
      id: 4,
      artist: "Jessica Hische",
      name: "All This and More",
      medium: "Letterpress Print",
      date: "2023",
      dimensions: "11 x 14",
    },
    {
      id: 5,
      artist: "Jai Vasicek",
      name: "Nim",
      medium: "Print of a Painting",
      date: "2023",
      dimensions: "11 x 14",
    },
    {
      id: 6,
      artist: "Anthony Burrill",
      name: "You & Me",
      medium: "Woodblock Print",
      date: "2023",
      dimensions: "11 x 14",
    },
  ]);

  // useEffect(() => {
  //   fetch("https://localhost:8080/artwork/")
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <div>
      <header style={{ textAlign: "center", margin: "50px" }}>
        <h1>Art Collection</h1>
        <button className="btn btn-primary">Add New</button>
        <form>
          <input type="text" placeholder="Name" name="Name"></input>
          <input type="text" placeholder="Artist" name="Artist"></input>
          <input type="text" placeholder="Medium" name="Medium"></input>
          <input type="text" placeholder="Date" name="Date"></input>
          <input type="text" placeholder="Dimensions" name="Dimensions"></input>
          <input type="file" placeholder="Image"></input>
          <input type="submit" />
        </form>
      </header>
      {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."} */}
      {data
        ? data.map((artwork) => (
            <ArtworkTile
              key={artwork.id}
              artist={artwork.artist}
              name={artwork.name}
              medium={artwork.medium}
              dimensions={artwork.dimensions}
              date={artwork.date}
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
