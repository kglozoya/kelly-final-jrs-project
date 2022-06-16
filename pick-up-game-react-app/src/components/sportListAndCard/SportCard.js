import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SportCard.css'


export default function SportCard ( { icon, game } ) {

  const navigate = useNavigate();

  function handleClicked () {
    navigate( `/sport/${game}` )
  }

  return (

      <div className='sportcard-container' onClick={handleClicked}>
        <div className='sporcard icon'>{icon} </div>
        <div className='sportcard name'>{game}</div>

      </div>

  )
}