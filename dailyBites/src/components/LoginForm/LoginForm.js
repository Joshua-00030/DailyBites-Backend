import React, { useState, useEffect } from 'react';
import PasswordInput from '../PasswordInput/PasswordInput';
import LoginInput from '../LoginInput/LoginInput';
import loginService from '../../services/login';
import userItemService from '../../services/userItem';
import "./LoginForm.css"

const LoginForm = (props) => {

    const [newAccount, setNewAccount] = useState(false)
    const [input, setInputs] = useState(true)
    const [formDetails, setFormDetails] = useState({
        username: "",
        password: "",
        cPassword: "",
        email: ""
    })
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedDietappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          userItemService.setToken(user.token)
        }
      }, [])

    function handleInputChange({ text, inputName }) {
        setFormDetails({ ...formDetails, [inputName]: text })
    }

    function createNewAccount(event) {
        event.preventDefault()
        setNewAccount(true)
        setInputs(true)
    }

    function forgotPassChange(event) {
        event.preventDefault()
        setInputs(false)
        setNewAccount(true)
    }

    function submitHandler(event) {
        event.preventDefault()
        props.Login(formDetails)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        setUsername(formDetails.username)
        setPassword(formDetails.password)
        try {
            const user = await loginService.login({
                username, password,
            })
            userItemService.setToken(user.token)
            window.localStorage.setItem(
                'loggedDietappUser', JSON.stringify(user)
            )
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            //setErrorMessage('wrong credentials')
            setTimeout(() => {
                //setErrorMessage(null)
            }, 5000)
        }
        props.Login(formDetails)
    }

    return (
        <div className='container'>
            <h1> Welcome {formDetails.username} </h1>
            <form onSubmit={handleLogin}>
                {input ?
                    <div>
                        <LoginInput placeholder="Username" name="username" handleChange={handleInputChange} value={formDetails.username} />
                        <PasswordInput placeholder="Password" name="password" handleChange={handleInputChange} value={formDetails.password} />
                    </div> : null}

                <button type="button" onClick={createNewAccount}>Create New Account</button>
                <button type="button" onClick={forgotPassChange}>Forgot Password?</button>

                {newAccount ?
                    <div>
                        <PasswordInput placeholder="Confirm Password" name="cPassword" handleChange={handleInputChange} value={FormData.cPassword} />
                        <LoginInput placeholder="Email Address" name="email" handleChange={handleInputChange} value={formDetails.email} />
                    </div> : null}

                <input type="submit" value="SUBMIT"></input>
            </form>
        </div>
    )
}

export default LoginForm