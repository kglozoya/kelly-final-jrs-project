import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import './MustSignInModal.css'

export default function MustSignInModal ( { setShowSignInModal, setShowLandingPageModal } ) {

  return (
    <div className='must-sign-in-root'>

      <div className='info-container'>
        <div>
          {!setShowLandingPageModal
            ? 'You must be logged in to sign up for a game.'
            : 'You must be logged in to add a new game'
          }


          <Link to={'/login'} className='link'>
            <div className='login-button'> Log in</div>
            <br />
          </Link>
          <div className='not-a-member'> Not a member?</div>
          <Link to={'/signup'} className='link'>
            <div className='sign-up-button'> Sign up</div>
            <br />

          </Link>

        </div>
        <button
          className='close-button'
          type='button'
          onClick={() => {
            setShowSignInModal( false )
          }}><FontAwesomeIcon icon={faXmark} /></button>
      </div>

    </div>
  )
}
