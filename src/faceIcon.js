import React, { Component } from "react";

import Icon from "./Icon";

const FaceIcon = ({ name, ticket, onUpdate }) => {
  <Icon
    name={name}
    s
    className={ticket.rating === name ? "rating-selected" : ""}
    onClick={e => onUpdate(e, ticket.id, name)}
  />;
};

export default FaceIcon;
