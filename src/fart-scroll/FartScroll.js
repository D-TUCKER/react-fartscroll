// HelloWorld.js
import React from 'react'
const HelloWorld = (props) => {
  const children = props.children
    ? <span>{props.children}</span>
    : false
  return (
    <div>
      <h1>Hello World!</h1>
      {children}
    </div>
  )
}
export default HelloWorld