import React from "react";
export default ({ name, className, style, ...props }) => (
  <i className={`${className} fa fa-${name}`} style={style} {...props} />
);
