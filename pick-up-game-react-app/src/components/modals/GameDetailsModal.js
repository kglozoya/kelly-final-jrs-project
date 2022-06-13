import React from 'react'
import './GameDetailsModal.css'

export default function GameDetailsModal ( { address1, city, dateTime, gender, locationNote, skillLevel, firstName, lastName, email, setShowDetailsModal, date, time } ) {


  return (
    <div className='gamedetails-root'>

      <div className='info-container'>
        <b>When |</b> {dateTime.toLocaleString( 'en-EN', date )},
        <br />
        {dateTime.toLocaleString( 'en-EN', time )}
        <b className='city'>City |</b> {city}
        <b>Street Address |</b> {address1}
        <b>Location Specifics |</b> <br /> {locationNote}
        <b>Skill Level |</b> {skillLevel}
        <b>Male/Female/Coed |</b> {gender}
        <b>Game Creator |</b> <br />{firstName} {lastName}
        <a href={`mailto:${email}`}> <button type='button'>contact {firstName}</button></a>
        <button type='button'
          onClick={() => {
            setShowDetailsModal( false )
          }}>Close</button>
      </div>
    </div>
  )
}
