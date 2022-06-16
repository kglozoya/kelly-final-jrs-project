import React, { useState, useRef, useEffect } from 'react'
import './UserLoginSignup.css'
import { Link } from "react-router-dom";
import { useAxios } from '../../services/axios.service';
import { useNavigate } from 'react-router';
import { useLocalStorage } from '../../services/localstorage.service';
import Toast from '../toasts/Toast';
import { useToasts } from '../toasts/ToastService';
import circlePinkGreen from '../../assets/images/logo-green-then-pink.png'

export default function Login () {

  const localStorageService = useLocalStorage()
  const http = useAxios()
  const toast = useToasts();
  var navigate = useNavigate()

  // const [ isLoading, setIsLoading ] = useState( false )
  const [ formData, setFormData ] = useState( {
    email: '',
    password: ''
  } )

  const emailRef = useRef( null );
  const passwordRef = useRef( null );

  function handleChange ( e ) {
    let value = e.target.value
    let name = e.target.name

    setFormData( {
      ...formData,
      [ name ]: value
    } );
  }

  function attemptLogIn () {
    // setIsLoading( true )
    if ( formData.email && formData.password ) {
      http.login( formData )
        .then( results => {
          toast.success( "Let's play pick up!", "Welcome Back" )
          localStorageService.savePlayer( results.data.player );
          navigate( '/' )
        } ).catch( err => {
          // setIsLoading( false )
          console.log( err )
          toast.error( "Email or password was incorrect.", "Try again"  )
          setFormData( { email: '', password: '' } );
        } )
    }
  }

  function handleFormSubmit ( e ) {
    e.preventDefault()
    // setIsLoading( true )
    setTimeout( () => {
      attemptLogIn()
    }, 1000 )
  }

  useEffect( () => {
    emailRef.current.focus()
  }, [] )

  return (
    <div className='login-form-root'>


      <div className='img-container'>

        <img src={circlePinkGreen} />

        <h1>Welcome back!</h1>

        <div className="cta-switch-container">
          <p>Not a member?</p>
          <Link to="/signup" className='link'>
            Sign up
          </Link>
        </div>

      </div>


      <form className="login-form"
        onSubmit={handleFormSubmit}>

          <h2>Let's find your<br/>account</h2>
          
        <div className='input-container'>
          <div className='login-input'>
            <label htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              ref={emailRef}
              placeholder="juana101@email.com"
              id="email"
              required
            />
          </div>

          <div className='password-input'>
            <label htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              ref={passwordRef}
              placeholder="*******"
              id="password"
              required
            />
          </div>
          <br />
          <button
            type="submit"
            className='login-button'>
            Login
          </button>



        </div>

      </form>
    </div>
  )
}
