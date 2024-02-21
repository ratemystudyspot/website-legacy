import React from 'react'

const ButtonComponent = (props) => {
  const buttonStyle = {
    backgroundColor: props.backgroundColor, // Set the background color
    color: props.color, // Set the text color
    padding: props.padding, // Set padding
    borderRadius: props.borderRadius, // Set border radius
    border: props.border, // Change border
    cursor: props.cursor, // Change cursor on hover
  };

  return (
    <button style={buttonStyle} onClick={() => {props.onClick()}}>{props.text}</button>
  );
}

// default values for props if not specified
ButtonComponent.defaultProps = {
  backgroundColor: 'white',
  color: 'black',
  padding: '10px 20px',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  text: 'change this text by adding adding a \'text\' field in your code!',
  onClick() {/*do nothing*/},
};

export default ButtonComponent;
