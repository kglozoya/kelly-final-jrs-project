import React, { useEffect, useState } from 'react'
import UpcomingGamesList from './UpcomingGamesList'
import { useAxios } from '../../services/axios.service'
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../services/localstorage.service';
import MustSignInModal from '../modals/MustSignInModal';

export default function UpcomingGamesLandingPage () {

  const http = useAxios();
  const [ games, setGames ] = useState( [] )
  const navigate = useNavigate();
  const localStorageService = useLocalStorage();

  var player = localStorageService.getPlayer()

  const [ showSignInModal, setShowSignInModal ] = useState( false );
  const [ showLandingPageModal, setShowLandingPageModal ] = useState( false );


  function getAllGames () {
    http.getAllGames()
      .then( ( response => {

        setGames( response.data.games.map( g => {
          return {
            ...g,
            dateTime: new Date( g.dateTime )
          }
        } ) )
      } ) )
      .catch( ( err ) => { console.log( err ) } )
  }

  function onAddGameClicked () {
    if ( player ) {
      navigate( '/create-game' )
    } else {
      setShowSignInModal( true )
    }
  }


  useEffect( () => {
    getAllGames()
  }, [] )

  return (
    <div>
      <h1> Pickup Volleyball</h1>
      <h2> upcomming games</h2>
      <button onClick={onAddGameClicked}> Add a new Game</button>

      <UpcomingGamesList key={games.id} games={games} />
      {showSignInModal && <MustSignInModal
        setShowSignInModal={setShowSignInModal}
        setShowLandingPageModal={setShowLandingPageModal}
      />
      }
    </div>
  )
}
