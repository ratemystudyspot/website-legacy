import React from 'react'
import './Input.scss'

function Input({ label, placeholder, type, targetName, inputValue, defaultValue, changeAction, submitAction, requiredInput=false }) {
  return (
    <div className="input-field">
      <label className="input-field__placeholder">{label}</label>
      <input
        type={type}
        className="input-field__input-box"
        name={targetName}
        value={inputValue}
        defaultValue={defaultValue}
        onChange={changeAction}
        placeholder={placeholder}
        onSubmit={submitAction}
        required={requiredInput}
      />
    </div>
  )
}

export default Input;