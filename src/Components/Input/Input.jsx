import React from 'react'
import './Input.scss'

function Input({ label, type, targetName, defaultValue }) {
  return (
    <div className="input-field">
      <label className="input-field__placeholder">{label}</label>
      <input
        type={type}
        className="input-field__input-box"
        name={targetName}
        defaultValue={defaultValue}
        required
      />
    </div>
  )
}

export default Input;