import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MyGamesContext } from '../../App'
import GameCard from '../gameCard/GameCard'
import './MyGamesList.css'

export default function MyGamesList ( { myGames, sport } ) {

  const { updateMyGames } = useContext( MyGamesContext );
  var currentTime = new Date().getTime();
  var myCurrentGames = [];

  if ( myGames.length > 0 ) {

    myGames.sort( function ( a, b ) {
      return a.dateTime.getTime() - b.dateTime.getTime()
    } )
  }


  if ( myGames.length > 0 ) {
    myCurrentGames = myGames.filter( ( g ) => (
      ( g.dateTime.getTime() >= currentTime ) && ( g.sport == sport )
    ) )
  }
  
  useEffect(() => {
    updateMyGames()
    console.log(myCurrentGames)
  }, [])
  


  return (
    <div className='my-games-list-root'>

      {myCurrentGames.length == 0
        ? (
          <div>

            <h1>Not signed up for any  <br /> {sport} games... <br />yet! </h1>

            <Link to={ `/create-game/${sport}`} className="link">
              <button className='post-button'><FontAwesomeIcon icon={faArrowRight} /> POST NEW GAME </button>
            </Link>

          </div> )
        : myCurrentGames.map( ( game ) => (
          <GameCard key={game.id} {...game} />
        ) )}

    </div>
  )
}
