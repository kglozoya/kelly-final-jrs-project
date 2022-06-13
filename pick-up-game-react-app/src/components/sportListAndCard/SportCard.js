import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SportCard.css'


export default function SportCard ({img}) {

  const navigate = useNavigate();

  function handleClicked () {
    navigate( '/upcoming-games' )
  }

  return (

    <div className="sportcard-root">

      <div className='sportcard-container' onClick={handleClicked}>
        
        <img src={img}></img>
        <button type='button' >
          Let's play
        </button>
        
      </div>

    </div>


  )
}
