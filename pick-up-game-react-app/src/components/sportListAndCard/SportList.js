import React from 'react'
import SportCard from './SportCard'
import './SportList.css'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaseballBall, faCoffee, faVolleyball, faFutbol, faFootball, faBasketball } from '@fortawesome/free-solid-svg-icons'
import sunsetVolley from '../../assets/images/sunsestVolley.jpg'
import colorfulBasketball from '../../assets/images/colorfulBasketball.jpg'


export default function SportList () {

  const SPORTIMAGES = [
    sunsetVolley,
    colorfulBasketball,
    sunsetVolley,
    colorfulBasketball
  ]

  // const SPORTICONS =[
  //   <FontAwesomeIcon icon={faBasketball} />,
  //   <FontAwesomeIcon icon={faVolleyball} />,
  //   <FontAwesomeIcon icon={faFutbol} />, 
  //   <FontAwesomeIcon icon={faFootball} /> 
  // ]

  const SPORTICONS = [
    {
      icon: <FontAwesomeIcon icon={faBasketball} />, game: "Basketball"},
    { icon: <FontAwesomeIcon icon={faVolleyball} />, game: "Volleyball" },
    { icon: <FontAwesomeIcon icon={faFutbol} />, game: "Soccer" },
    { icon: <FontAwesomeIcon icon={faFootball} />, game: "Football" }
  ]

  return (
    <div className='sportlist-root'>

      <div className='card-container'>
        {SPORTICONS.map( ( icon ) => ( <SportCard key={icon.game} icon={icon.icon} game={icon.game} /> ) )}
      </div>
    </div>
  )
}
