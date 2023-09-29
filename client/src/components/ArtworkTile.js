import React from "react";
import "./artworkTile.css";

const ArtworkTile = (params) => {
  return (
    <div className="artwork-tile">
      <h2>{params.name}</h2>
      <h5>{params.artist}</h5>
      <p>
        <span>{params.medium}</span>&nbsp;&nbsp;
        <span>{params.date}</span>&nbsp;&nbsp;
        <span>{params.dimensions}</span>
      </p>
      <div className="image"></div>
      <button className="btn btn-light">Delete</button>
      <button className="btn btn-light">Edit</button>
    </div>
  );
};

export default ArtworkTile;
