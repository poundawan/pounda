import React from "react";
import Icon from "./Icon";
function FaceIcon({ name, ticket, onUpdate }) {
  return (
    <Icon
      name={name}
      className={`${ticket.rating === name ? "active" : ""} theme-${name}`}
      onClick={e => onUpdate(e, ticket, name)}
    />
  );
}

export const FaceIcons = ({ ticket, onUpdate }) => {
  const faces = ["angry", "frown", "meh", "smile", "grin-alt", "grin-stars"];

  return faces.map(faceName => (
    <FaceIcon
      key={faceName}
      name={faceName}
      ticket={ticket}
      onUpdate={onUpdate}
    />
  ));
};
