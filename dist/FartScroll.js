// HelloWorld.js
import React from 'react';

const HelloWorld = props => {
  const children = props.children ? React.createElement("span", null, props.children) : false;
  return React.createElement("div", null, React.createElement("h1", null, "Hello World!"), children);
};

export default HelloWorld;