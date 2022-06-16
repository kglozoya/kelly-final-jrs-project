import React, { useState, useRef, useEffect } from 'react'
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import './UserLoginSignup.css'
import { Link, useNavigate } from 'react-router-dom'
import circlePinkGreen from '../../assets/images/logo-pink-green.png'
import Toast from '../toasts/Toast';
import { useToasts } from '../toasts/ToastService';


export default function SignUp () {

  var http = useAxios();
  const localStorageService = useLocalStorage()
  var navigate = useNavigate();
  const toast = useToasts();

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
        toast.success( "Account created!" )
        localStorageService.savePlayer( results.data.player )
        navigate( '/' )
      } ).catch( err => {
        console.error( err );
        toast.error( "Hmm, something went wrong.." )
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
    console.log( formData )
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
        setIsEmailTaken( true )
      } )
      .catch( ( err ) => {
        console.log( err )
        let statusCode = err.response.statusCode
        if ( statusCode == 404 ) {
          setIsEmailTaken( false )
        } else if ( err.response.status == 401 ) {
          setIsEmailTaken( true )
        }
        else {
          console.err( err )
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


      <div className='img-container'>
        
        <img src={circlePinkGreen} />
        
        <h1>Join the fun!</h1>
        
        <div className='cta-switch-container' >
          <p >Already a member?</p>
          <Link to="/login" className='link'>
            Log in
          </Link>
        </div>
        
      </div>
      
        <form className="sign-up-form"
          onSubmit={handleFormSubmit}>


          <div className='first-name-input'>
            <label htmlFor="firstName">
              First Name
            </label>
            <br />
            <input
              type="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              ref={emailRef}
              placeholder="Juana"
              id="firstName"
              required
            />
          </div>

          <div className='last-name-input'>
            <label htmlFor="lastName">
              Last Name
            </label>
            <br />
            <input
              type="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              ref={emailRef}
              placeholder="Smith"
              id="lastName"
              required
            />
          </div>

          <div className='email-input'>
            <label htmlFor="email">
              Email Address
            </label>
            <br />
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
            <br />
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
          <p id="password-instructions">--7  character minimum--</p>
          </div>

          <br />

          <button
            type="submit"
            className='sign-up-button'
          >Create my account!
          </button>
        </form>
           
    </div>
  )
}
