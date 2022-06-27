import React, { useState } from 'react'
import SportList from '../sportListAndCard/SportList'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './Homepage.css'
import { Link, useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../../services/localstorage.service';
import MustSignInModal from '../modals/MustSignInModal'


export default function Homepage () {
  
  const [ showSignInModal, setShowSignInModal ] = useState( false );
  const [ showLandingPageModal, setShowLandingPageModal ] = useState( false );

  const navigate = useNavigate();
  const localStorageService = useLocalStorage();
  var player = localStorageService.getPlayer()

  
  function onAddGameClicked () {
    if ( player ) {
      navigate( '/create-game/basketball' )
    } else {
      setShowSignInModal( true )
    }
  }
  
  return (
    <div className="homepage">

      <div className='hero-element-root'>
        <div className='hero-element-text'>
          <p>Choose a game</p>
          <h1> Let's play!</h1>
        </div>

          <button onClick={onAddGameClicked}><FontAwesomeIcon icon={faArrowRight} /> POST NEW GAME </button>

        <div className='hero-element-cards'>
          <SportList />
        </div>
      </div>
      {showSignInModal && <MustSignInModal
            setShowSignInModal={setShowSignInModal}
            setShowLandingPageModal={setShowLandingPageModal}
          />
          }

    </div>
  )
}
