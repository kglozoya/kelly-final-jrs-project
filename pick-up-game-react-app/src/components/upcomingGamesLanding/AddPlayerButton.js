import React, { useContext, useEffect, useState } from 'react'
import { MyGamesContext } from '../../App';
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import MustSignInModal from '../modals/MustSignInModal';
import { useToasts } from '../toasts/ToastService';

export default function AddPlayerButton ( { gameId, setRosterCount, rosterCount, setShowSignInModal } ) {

  const [ isButtonDisabled, setIsButtonDisabled ] = useState( false )

  const toast = useToasts();
  const http = useAxios();
  const localStorageService = useLocalStorage();
  const { updateMyGames } = useContext( MyGamesContext )

  var playerId = localStorageService.getPlayer()?.id;

  function onButtonClicked () {
    if ( playerId ) {
      http.addPlayerToGame( gameId, playerId )
        .then( ( results ) => {
          setRosterCount( rosterCount + 1 )
          toast.success(`You've been added to the roster`, 'See you there!')

          setIsButtonDisabled( true )
          updateMyGames()
        } )
        .catch( ( err ) => { console.log( err ) } )
    } else {
      setShowSignInModal( true )
    }
  }


  return (
    <button type='button'
      onClick={onButtonClicked}
      disabled={isButtonDisabled}
    >
      Count me in!
    </button>

  )
}
