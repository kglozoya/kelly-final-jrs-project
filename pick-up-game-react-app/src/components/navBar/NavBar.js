import React, { useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAxios } from '../../services/axios.service';
import './NavBar.css';
import { useLocalStorage } from '../../services/localstorage.service';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import circleLogoOnly from '../../assets/images/circle-only.png'




export default function NavBar () {


  const http = useAxios();
  const navigate = useNavigate();
  // const { playerId } = useParams();
  const localStorageService = useLocalStorage();
  const player = localStorageService.getPlayer();

  function onLogoutClicked () {
    localStorageService.removePlayer()
    navigate( '/' )
  }

  const loginButton = (
    <button onClick={() => {
      navigate( '/login' )
    }}>
      Log In
    </button>
  )

  const logoutButton = (
    <button onClick={onLogoutClicked}>
      Log out <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  )

  const signUpButton = (
    <button onClick={() => {
      navigate( '/signup' )
    }}>
      Sign up
    </button>
  )

  const myGamesButton = (
    <Link to={"/my-games"} className='my-schedule-link'>
      <button type='button'>My Schedule</button>
    </Link>
  )

  return (

    <nav className="nav-bar-root">
      <Link to={"/"}>
        <img src={circleLogoOnly} />
      </Link>

      <div className='main-options'>
        <div className="dropdown-container">

          <button className='hoverable' onClick={()=>{navigate('/sport')}}> Sports </button>

          <div className="hidden-menu">

            <Link to={"/sport/basketball"} className="sport-link">
              <div className="option">Basketball</div>
            </Link>

            <Link to={"/sport/volleyball"} className="sport-link">
              <div className="option">Volleyball</div>
            </Link>

            <Link to={"/sport/soccer"} className="sport-link">
              <div className="option">Soccer</div>
            </Link>

            <Link to={"/sport/football"} className="sport-link">
              <div className="option">Football</div>
            </Link>
          </div>
        </div>

        {player ? myGamesButton : ''}
        {player ? '' : signUpButton}
        {player ? logoutButton : loginButton}

      </div>

    </nav>

  )
}
