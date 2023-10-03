import React, { Fragment, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
// import FormInput from "./FormInput";
import "./artworkTile.css";

const ArtworkTile = (params) => {
  const [edit, updateEdit] = useState(false);
  const [artwork, updateArtwork] = useState(params.artwork);

  const handleUpdate = (event) => {
    event.preventDefault();
    params.editArtworkEntry(artwork);
    updateEdit(!edit);
  };

  return (
    <div className="artwork-tile">
      {edit ? (
        <form>
          <input
            className="form-control form-control-sm"
            type="text"
            value={artwork.name}
            onChange={(e) =>
              updateArtwork({ ...artwork, name: e.target.value })
            }
          />
          <input
            className="form-control form-control-sm"
            type="text"
            value={artwork.artist}
            onChange={(e) =>
              updateArtwork({ ...artwork, artist: e.target.value })
            }
          />
          <input
            className="form-control form-control-sm"
            type="text"
            value={artwork.medium}
            onChange={(e) =>
              updateArtwork({ ...artwork, medium: e.target.value })
            }
          />
          <input
            className="form-control form-control-sm"
            type="text"
            value={artwork.date}
            onChange={(e) =>
              updateArtwork({ ...artwork, date: e.target.value })
            }
          />
          <input
            className="form-control form-control-sm"
            type="text"
            value={artwork.dimensions}
            onChange={(e) =>
              updateArtwork({ ...artwork, dimensions: e.target.value })
            }
          />
          <button
            className="btn btn-success"
            onClick={(e) => handleUpdate(e)}
            type="submit"
          >
            Save changes
          </button>
        </form>
      ) : (
        <Fragment>
          <h2>{artwork.name}</h2>
          <h5>{artwork.artist}</h5>
          <p>
            <span>{artwork.medium}</span>&nbsp;&nbsp;
            <span>{artwork.date}</span>&nbsp;&nbsp;
            <span>{artwork.dimensions}</span>
          </p>
          <img
            alt={artwork.name}
            src={`https://art--collection.s3.amazonaws.com/${artwork.image}`}
          />
        </Fragment>
      )}
      {!edit && (
        <button
          onClick={() => {
            params.onDelete(artwork._id);
          }}
          className="btn delete-btn"
        >
          <FaRegTimesCircle className="deleteIcon" />
        </button>
      )}
      <div>
        {!edit && (
          <button
            onClick={() => updateEdit(!edit)}
            className="edit-btn btn btn-light btn-sm"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ArtworkTile;
