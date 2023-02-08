import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';

const PasswordInput = (props) => {

    const [showPasword, setShowPassword] = useState(false)

    function handleChange(event) {
        const text = event.target.value;
        const inputName = event.target.name 

        props.handleChange({text, inputName});
      };

  return (
    <div className="password-container">
                <input name={props.name} 
                    placeholder={props.placeholder}
                    onChange={handleChange}
                    value={props.value}
                    type={showPasword ? null : "password"}
                    required
                />
                <FontAwesomeIcon 
                    onClick={() => {setShowPassword(!showPasword)}} 
                    icon={faEye} 
                    className="eyeIcon">
                </FontAwesomeIcon>
                </div>
  )
}

export default PasswordInput