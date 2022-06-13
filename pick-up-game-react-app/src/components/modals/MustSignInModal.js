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
        
        
        <Link to={'/login'}>
          <div> LOG IN</div>
        </Link>
        <div> Not a member of the team yet?</div>
        <Link to={'/signup'}>
          <div> SIGN UP</div>
        </Link>
        
      </div>
      <button type='button'
        onClick={() => {
          setShowSignInModal( false )
        }}>Close</button>
      </div>    
        
    </div>
  )
}
