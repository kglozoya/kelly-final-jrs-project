import React from 'react'
import SportCard from './SportCard'
import './SportList.css'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaseballBall, faCoffee, faVolleyball, faFutbol, faFootball, faBasketball } from '@fortawesome/free-solid-svg-icons'


export default function SportList () {


  const SPORTICONS = [
    { icon: <FontAwesomeIcon icon={faBasketball} />, game: "basketball"},
    { icon: <FontAwesomeIcon icon={faVolleyball} />, game: "volleyball" },
    { icon: <FontAwesomeIcon icon={faFutbol} />, game: "soccer" },
    { icon: <FontAwesomeIcon icon={faFootball} />, game: "football" }
  ]

  return (
    <div className='sportlist-root'>

      <div className='card-container'>
        {SPORTICONS.map( ( icon ) => ( <SportCard key={icon.game} icon={icon.icon} game={icon.game} /> ) )}
      </div>
    </div>
  )
}
