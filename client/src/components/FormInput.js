import React from "react";

const FormInput = (params) => {
  const { content, artwork, updateArtwork } = params;
  return (
    <input
      className="form-control form-control-sm"
      type="text"
      value={content}
      onChange={(e) => updateArtwork({ ...artwork, content: e.target.value })}
    />
  );
};

export default FormInput;
