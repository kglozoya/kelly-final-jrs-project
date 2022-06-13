import React from 'react'
import SportList from '../sportListAndCard/SportList'
import Grass1 from '../../assets/images/grassOne.jpg';
import Grass3 from '../../assets/images/grassThreeReverseCut.jpg';
import './Homepage.css'



export default function Homepage() {
  return (
    <div className="homepage">
    <div className='hero-element-root'>
      <img src={Grass1}></img>
      {/* <img src={Grass3}></img> */}
      <div className='hero-element-text'>
        {/* <h1>GAME TIME</h1> */}
      <h1> Off the couch.</h1>
      <h1> Onto the field.</h1>
      </div>        
    </div>

    <SportList />
  </div>
  )
}
