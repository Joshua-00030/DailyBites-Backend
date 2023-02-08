import React from 'react'

const LoginInput = (props) => {

    function handleChange(event) {
        const text = event.target.value;
        const inputName = event.target.name 

        props.handleChange({text, inputName});
      };

  return (
    <div>
        <input 
            name={props.name}
            placeholder={props.placeholder}
            onChange={handleChange} 
            value={props.value} 
            autoFocus/>
        </div>
  )
}

export default LoginInput