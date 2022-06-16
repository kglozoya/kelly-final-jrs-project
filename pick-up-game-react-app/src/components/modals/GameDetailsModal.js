import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { useAxios } from '../../services/axios.service'
import './GameDetailsModal.css'
import { useLocalStorage } from '../../services/localstorage.service';
import { useToasts } from '../toasts/ToastService'
import { MyGamesContext } from '../../App'
import { AllGamesContext } from '../upcomingGamesLanding/UpcomingGamesLandingPage'


export default function GameDetailsModal ( { gameId, address1, city, dateTime, gender, locationNote, skillLevel, firstName, lastName, email, setShowDetailsModal, date, time, gameCreatorId } ) {

  const http = useAxios();
  const localStorageService = useLocalStorage();
  const toast = useToasts();
  const { getGamesByPlayerId } = useContext( MyGamesContext );
  const allGamesContextValue = useContext( AllGamesContext );
  const getAllGames = allGamesContextValue?.getAllGames


  const playerId = localStorageService.getPlayer()?.id


  console.log( gameId )

  function deleteGame ( gameId ) {

    http.deleteGameById( gameId )
      .then( ( results ) => {
        console.log( results )
        setShowDetailsModal( false )
        // update 'myGames'
        getGamesByPlayerId()
        // update upcoming games list
        getAllGames()
      } )
      .catch( ( err ) => {
        console.log( err )
      } )
  }


  return (
    <div className='gamedetails-root'>

      <div className='info-container'>
        <h2>Game Details</h2>




        <div className="grid">

          <div className="col-one">
            <b>When</b> {dateTime.toLocaleString( 'en-EN', date )}
            <br />
            {dateTime.toLocaleString( 'en-EN', time )}
            <b className='city'>City</b> {city}
            <b>Street Address</b> {address1}
          </div>


          <div className="col-two">
            <b>Skill Level</b> {skillLevel}
            <b>Male/Female/Coed </b> {gender}

            {playerId == gameCreatorId
              ? <button onClick={() => { deleteGame( gameId ) }} className="delete-game-button"> Delete Game</button>
              : <div>
                <b>Game Contact</b>
                <a href={`mailto:${email}`} >
                  <button type='button' className='contact-button'>
                    {firstName} {lastName}
                  </button>
                </a>
              </div>
            }
          </div>

        </div>

        <div>
          <br />
          <b>Location Specifics</b>
          <br />
          {locationNote ? locationNote : "No additional location info"}

        </div>




        <button
          className='close-details-modal'
          type='button'
          onClick={() => {
            setShowDetailsModal( false )
          }}><FontAwesomeIcon icon={faXmark} /></button>
      </div>
    </div>
  )
}
