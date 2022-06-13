import React, { useState, useRef, useEffect } from 'react'
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import './UserLoginSignup.css'
import { Link, useNavigate } from 'react-router-dom'


export default function SignUp () {

  var http = useAxios();
  const localStorageService = useLocalStorage()
  var navigate = useNavigate();

  const [ formData, setFormData ] = useState( {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  } )

  const [ isEmailTaken, setIsEmailTaken ] = useState( true );

  const emailRef = useRef( null );
  const passwordRef = useRef( null );
  const timeoutRef = useRef( null );


  function attemptSignUp ( formData ) {
    http.createNewPlayer( formData )
      .then( results => {
        console.log( results )
        alert("Account creation was a success!")
        localStorageService.savePlayer(results.data.player)
        navigate('/')
      } ).catch( err => {
        console.error( err );
        alert("Oops! Account with that email already exists. Try logging in instead")
      }
      )
  }


  function handleChange ( e ) {
    let value = e.target.value
    let name = e.target.name

    setFormData( {
      ...formData,
      [ name ]: value
    } );
    console.log(formData)
  }


  function handleFormSubmit ( e ) {
    e.preventDefault()
    // could say instead ({...formData}) ?
    if ( formData.firstName && formData.lastName && formData.email && formData.password && checkIfEmailIsTaken ) {
      
      attemptSignUp( formData );
      
    }
  }
  // -----CHECK IF Email IS TAKEN --------------

  function checkIfEmailIsTaken () {
    http.getPlayerByEmail( formData.email )
      .then( ( results ) => {
        console.log( results )
        console.log( formData.email )
        setIsEmailTaken(true)
      } )
      .catch( ( err ) => {
        console.log( err )
        let statusCode = err.response.statusCode
        if (statusCode == 404) {
          setIsEmailTaken(false)
        } else if (err.response.status == 401) {
          setIsEmailTaken(true)
        }
        else {
          console.err(err)
        }
      }
      )
  }

  useEffect( () => {
    clearTimeout( timeoutRef.current )
    timeoutRef.current = setTimeout( () => { checkIfEmailIsTaken() }, 500 )
  }, [ formData.email ] )

  useEffect( () => {
    emailRef.current.focus()
  }, [] )

  return (
    <div className='sign-up-form-root'>
      <form className="sign-up-form"
        onSubmit={handleFormSubmit}>
        <h2>Charleston Pickup Games</h2>
        <h1>Put me in, coach!</h1>
        
        <div className='input-container'>
          
        <div className='first-name-input'>
            <label htmlFor="firstName">
            </label>
            <input
              type="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              ref={emailRef}
              placeholder="First Name"
              id="firstName"
              required
            />
          </div>
          
        <div className='last-name-input'>
            <label htmlFor="lastName">
            </label>
            <input
              type="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              ref={emailRef}
              placeholder="Last Name"
              id="lastName"
              required
            />
          </div>
          
          <div className='email-input'>
            <label htmlFor="email">
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              ref={emailRef}
              placeholder="Email"
              id="email"
              required
            />
          </div>

          <div className='password-input'>
            <label htmlFor="password">
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              ref={passwordRef}
              placeholder="Password"
              id="password"
              required
            />
          </div>
          <div>Password must be at least 7 characters</div>
          <br />
          <button
            type="submit"
            className='sign-up-button'
          >Create my account!
          </button>
          <br />
          <br />
          <div className='cta-switch-container' >
            <p >Already a member?</p>
            <Link to="/login" className='link'>
              Get logged in
            </Link>
          </div>
        </div>

      </form>
    </div>
  )
}
