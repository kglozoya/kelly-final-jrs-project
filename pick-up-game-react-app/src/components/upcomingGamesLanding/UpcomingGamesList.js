import React from 'react'
import GameCard from '../gameCard/GameCard'
import './UpcomingGameList.css'

export default function UpcomingGamesList ( { games } ) {

  var currentTime = new Date().getTime()

  
//-------------- putting games in accendeing order and filtering out past games---------/
  if ( games.length > 0 ) {

    games.sort(function (a, b){
      return a.dateTime.getTime() - b.dateTime.getTime()
    })
    
    console.log(games)
  }
  
  if (games.length > 0){
    var currentGames = games.filter((g) => (
      g.dateTime.getTime() >= currentTime
      ))}
      
  


  return (
    <div className='upcoming-game-list-root'>
      {currentGames && currentGames.map( ( game ) => (
        <GameCard key={game.id} {...game} />
      ) )}
    </div>
  )
}
