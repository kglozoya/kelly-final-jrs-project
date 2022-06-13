import React, { createContext, useContext, useEffect, useState } from 'react'
import { MyGamesContext } from '../../App';
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import MyGamesList from './MyGamesList';
import './MyGamesLandingPage.css'

export default function MyGamesLandingPage () {

  const { myGames, updateMyGames } = useContext( MyGamesContext )

  const SPORTS = [
    'volleyball',
    'soccer',
    'frisbee',
    'basketball',
    'cycling'
  ]

  const [ sport, setSport ] = useState( 'volleyball' );

  function sportSelected ( newSport ) {
    setSport( newSport )
  }

  useEffect(()=>{
    updateMyGames()
  },[])


  return (
    <div className='mygames-landing-root'>
      <h1> My Upcoming Pickup Games</h1>

      <div className='sport-groups'>
        {SPORTS.map( ( _sport ) => (
          <div className={`sport ${sport == _sport && `selected`}`}
            onClick={() => sportSelected( _sport )}
          >
            {_sport}
          </div>
        ) )}
      </div>
      {(sport != 'volleyball')
        ?  <h1>Not signed up for any {sport} games... yet! </h1> 
        :  ((myGames.length == 0)
        ?  <h1>Not signed up for any {sport} games... yet! </h1> 
        :  (sport == 'volleyball') && <MyGamesList myGames={myGames} sport={sport} />)
        }
    
         

    </div>
  )
}