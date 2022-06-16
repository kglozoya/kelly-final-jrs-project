import ReactDOM from 'react-dom'
import { faCalendarXmark, faCircleMinus, faTrashCan, faUserMinus, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import { MyGamesContext } from '../../App';
import { useAxios } from '../../services/axios.service'
import { useLocalStorage } from '../../services/localstorage.service';
import { useToasts } from '../toasts/ToastService';
import './RemoveGameButton.css'

export default function RemoveGameButton ( { gameId, setRosterCount, rosterCount } ) {

  const [ isButtonDisabled, setIsButtonDisabled ] = useState( false )
  const { myGames, updateMyGames } = useContext( MyGamesContext )

  const http = useAxios();
  const localStorageService = useLocalStorage();
  const toast = useToasts();

  var playerId = localStorageService.getPlayer()?.id;

  function onRemoveButtonClicked () {
    http.removePlayerFromGame( gameId, playerId )
      .then( ( results ) => {
        toast.error( `You've been removed from the roster`, 'We will miss you!' )
        updateMyGames()
        if ( rosterCount >= 0 ) {
          setRosterCount( rosterCount - 1 )
        }
      } )
      .catch( ( err ) => { console.log( err ) } )
  }


  return (
    <div className='remove-game-button-root'>
      <button type='button' onClick={onRemoveButtonClicked} disabled={isButtonDisabled}>
        <FontAwesomeIcon icon={faUserXmark} />
        <span className=''>Take me out</span>
      </button>
    </div>
  )
}
