import React, { useContext } from 'react'
import GameCard from '../gameCard/GameCard'
import './MyGamesList.css'

export default function MyGamesList ({myGames, sport}) {
  
  if ( myGames.length > 0 ) {

    myGames.sort(function (a, b){
      return a.dateTime.getTime() - b.dateTime.getTime()
    })
    
    console.log(myGames)
  }
  
  var currentTime = new Date().getTime()
  
  if (myGames.length > 0){
    var myCurrentGames = myGames.filter((g) => (
      g.dateTime.getTime() >= currentTime
      ))}


  return (
    <div className='my-games-list-root'>
      {myCurrentGames.filter((g) => g.sport == 'volleyball').map( ( game ) => (
        <GameCard key={game.id} {...game} />
      ) )}
    </div>
  )
}
