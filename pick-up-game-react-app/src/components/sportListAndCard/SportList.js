import React from 'react'
import SportCard from './SportCard'
import './SportList.css'
import sunsetVolley from '../../assets/images/sunsestVolley.jpg'
import colorfulBasketball from '../../assets/images/colorfulBasketball.jpg'


export default function SportList() {
  
  const SPORTIMAGES = [
    sunsetVolley,
    colorfulBasketball,
    sunsetVolley,
    colorfulBasketball
  ]
  
  return (
    <div className='sportlist-root'>
      <h1>Charleston Pickup Sports</h1>
      <div className='card-container'>
        {SPORTIMAGES.map((img)=>(<SportCard key={img} img={img}/>))}  
      </div>
     
    </div>
  )
}
