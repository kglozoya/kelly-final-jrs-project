import React, { createContext, useContext, useEffect, useState } from 'react'
import { MyGamesContext } from '../../App';
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import MyGamesList from './MyGamesList';
import './MyGamesLandingPage.css'
import { Link } from 'react-router-dom';
import SportSelector from '../sportSelector/SportSelector';
import Loading from '../loading/Loading';

export default function MyGamesLandingPage () {

  const { myGames, updateMyGames, getGamesByPlayerId } = useContext( MyGamesContext );
  const [ isLoading, setIsLoading ] = useState( true );
  const [ sport, setSport ] = useState( 'basketball' );


  const SPORTS = [
    'basketball',
    'volleyball',
    'soccer',
    'football'
  ]


  function sportSelected ( newSport ) {
    setSport( newSport )
  }

  
  useEffect( ()=>{
    setTimeout( () => {
      setIsLoading( false )
    }, 1500 )
  } ,[]  )
  

  if ( isLoading ) {
    return (
      <Loading _sport={"basketball"}/>
    )
  } else {
    return (
      <div className='mygames-landing-root'>

        <div className='mygame-card-container'>

          <h1 className='my-game-schedule'> My Game Schedule</h1>

          < SportSelector sport={sport} onSportSelected={sportSelected} />


          <MyGamesList myGames={myGames} sport={sport} />


        </div>


      </div>
    )
  }

}