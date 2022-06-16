import React from 'react'
import GameCard from '../gameCard/GameCard'
import './UpcomingGameList.css'

export default function UpcomingGamesList ( { games, sport } ) {

  var currentTime = new Date().getTime()


  //-------------- putting games in accendeing order and filtering out past games---------/
  if ( games.length > 0 ) {

    games.sort( function ( a, b ) {
      return a.dateTime.getTime() - b.dateTime.getTime()
    } )
  }


  var currentGames = [];


  if ( games.length > 0 ) {
    currentGames = games.filter( ( g ) => (
      ( g.dateTime.getTime() >= currentTime ) && ( g.sport == sport )
    ) )
  }




  return (
    <div className='upcoming-game-list-root'>
      {currentGames && currentGames.map( ( game ) => (
        <GameCard key={game.id} {...game} />
      ) )}
    </div>
  )
}
