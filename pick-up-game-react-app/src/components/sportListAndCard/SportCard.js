import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SportCard.css'


export default function SportCard ( { icon, game } ) {

  const navigate = useNavigate();

  function handleClicked () {
    navigate( '/upcoming-games' )
  }

  return (

    <div className="sportcard-root">

      <div className='sportcard-container' onClick={handleClicked}>
        <div className='sporcard icon'>{icon} </div>
        <div className='sportcard name'>{game}</div>

      </div>

    </div>


  )
}

{/* <img src={img}></img> */ }
{/* <button type='button' >
  Let's play
</button> */}