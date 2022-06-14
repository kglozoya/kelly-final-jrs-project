import React from 'react'
import SportList from '../sportListAndCard/SportList'
import Grass1 from '../../assets/images/grassOne.jpg';
import Grass3 from '../../assets/images/grassThree.jpg';
import './Homepage.css'



export default function Homepage () {
  return (
    <div className="homepage">

      <div className='hero-element-root'>
        <div className='hero-element-text'>
          <p>Choose a game</p>
          <h1> Let's play!</h1>
        </div>
        <button> POST NEW GAME &#8594;</button>
        
        
        <div className='hero-element-cards'>
          <SportList />
        </div>
      </div>

    </div>
  )
}
