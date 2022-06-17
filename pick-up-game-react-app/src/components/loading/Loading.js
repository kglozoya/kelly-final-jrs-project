import { faBasketball, faVolleyball } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Loading.css'

export default function Loading () {
  return (
  <div className='loading-container'>
    <div className='loading bounce'>
      
    <FontAwesomeIcon icon={faBasketball} className='spin' />
    </div>
  </div>
  )
}
