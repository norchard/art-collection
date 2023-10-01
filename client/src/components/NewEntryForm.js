import React, { useState } from "react";

const NewEntryForm = (params) => {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [medium, setMedium] = useState("");
  const [date, setDate] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !artist || !medium || !date || !dimensions || !image) {
      alert("Please complete all fields");
      return;
    }
    params.addNewArtwork({
      name: name,
      artist: artist,
      medium: medium,
      date: date,
      dimensions: dimensions,
      image: image,
    });
  };

  const handleImageChange = (e) => {
    const img = e.target.files[0];
    setImage(img);
  };

  return (
    <form style={{ textAlign: "left", width: 500, margin: "0 auto" }}>
      <div className="form-group">
        <label htmlFor="Name">Artwork Name</label>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder="The Kiss"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="Name"
        ></input>
        <label htmlFor="Artist">Artist Name</label>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder="Gustav Klimt"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          name="Artist"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="Medium">Medium</label>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder="Oil Painting"
          value={medium}
          onChange={(e) => setMedium(e.target.value)}
          name="Medium"
        ></input>
        <label htmlFor="Date">Date</label>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder="1908"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          name="Date"
        ></input>
        <label htmlFor="Dimensions">Dimensions</label>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder='20"x20"'
          value={dimensions}
          onChange={(e) => setDimensions(e.target.value)}
          name="Dimensions"
        ></input>
        <label htmlFor="image">Image</label>
        <input
          className="form-control form-control-sm"
          type="file"
          accept="image/jpg"
          name="Image"
          onChange={handleImageChange}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-success" type="submit">
        Add New Artwork
      </button>
    </form>
  );
};

export default NewEntryForm;
