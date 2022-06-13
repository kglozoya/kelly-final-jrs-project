import React, { useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAxios } from '../../services/axios.service';
import './NavBar.css';
import { useLocalStorage } from '../../services/localstorage.service';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import logoLight from '../../assets/images/logo-light-green.jpg'



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
    <Link to={"/my-games"}>
      <button type='button'>My Pick Up Games</button>
    </Link>
  )

  return (

    <nav className="nav-bar-root">
      <div className='nav-bar-left'>
        <Link to={"/"}>
          <button type='button'> <img src={logoLight} width="75px"></img> </button>
          

        </Link>
        <span>|</span>

        <div className="dropdown-container">
          <button className='hoverable'> Sports </button>
          <div className="hidden-menu">
            <Link to={"/upcoming-games"} className="volleyball-link">
              <div className="option">Volleyball</div>
            </Link>
            <div className="option">Soccer</div>
            <div className="option">Frisbee</div>
            <div className="option">Basketball</div>
            <div className="option">Cycling</div>
            <Link to={"/create-game"} className="new-game-link">
              <div className="option"> + New PickUp Game</div>
            </Link>
          </div>
        </div>


        {player ? <span>|</span> : ''}
        {player ? myGamesButton : ''}
      </div>
      <div className='nav-bar-right'>
        {player ? '' : signUpButton}
        {player ? '' : <span>|</span>}
        {player ? logoutButton : loginButton}

      </div>
    </nav>

  )
}
