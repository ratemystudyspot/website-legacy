import React from 'react'

function LogoComponent() {
  return (
    <a className="a-logo" href="http://localhost:3000/">
      <img className="logo" src={require("./Assets/TempLogo.jpg")} alt="Temporary Logo" /> {/* CHANGE SRC AND ALT */}
    </a>
  )
}

export default LogoComponent