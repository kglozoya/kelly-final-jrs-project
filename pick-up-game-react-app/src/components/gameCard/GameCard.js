import React, { useContext, useEffect, useState } from 'react'
import { useAxios } from '../../services/axios.service';
import AddPlayerButton from '../upcomingGamesLanding/AddPlayerButton'
import { Link, useParams, useNavigate } from "react-router-dom";
import './GameCard.css'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faLocationDot, faVolleyball, faUsers } from '@fortawesome/free-solid-svg-icons'
import GameDetailsModal from '../modals/GameDetailsModal';
import RemoveGameButton from '../myGamesLanding/RemoveGameButton';
import MyGamesLandingPage from '../myGamesLanding/MyGamesLandingPage';
import { MyGamesContext } from '../../App';
import MustSignInModal from '../modals/MustSignInModal';
import { useLocalStorage } from '../../services/localstorage.service';

export default function GameCard ( { id, sport, address1, city, dateTime, gender, skillLevel, rosterCount, locationNote, firstName, lastName, email } ) {

    const date = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    const time = {
        hour: 'numeric',
        minute: 'numeric'
    };



    const http = useAxios();
    const navigate = useNavigate();
    const localStorageService = useLocalStorage();
    const [ _rosterCount, setRosterCount ] = useState( rosterCount || 0 );
    const [ showDetailsModal, setShowDetailsModal ] = useState( false );
    const [ showSignInModal, setShowSignInModal ] = useState( false );
    const { myGames } = useContext( MyGamesContext );

    // ------ TODO... maybe? Show different options on card for game creator, example option to delete game--//
    // var player = localStorageService.getPlayer()?.id
    // var gameCreator = myGames
    // console.log(myGames)


    function onDetailsButtonClicked () {
        setShowDetailsModal( true )
    }

    function isInMyGamesArr ( id, myGames ) {
        for ( let i = 0; i < myGames.length; i++ ) {
            if ( id == myGames[ i ].id ) {
                return true;
            }
        }
        return false;
    }
    

    return (
        <div className='gamecard-root'>
            <FontAwesomeIcon icon={faVolleyball} />
            <div className={`skill-level ${skillLevel == `all levels` ? `all-levels` : `${skillLevel}` }`}>{skillLevel} </div>

            <div><FontAwesomeIcon icon={faCalendarDay} /> {dateTime.toLocaleString( 'en-EN', date )}</div>

            <div className='city'><FontAwesomeIcon icon={faLocationDot} /> {city}</div>

            <div> <FontAwesomeIcon icon={faUsers} /> {_rosterCount}</div>

            {/* ---------------details I don't think need to show on the card--------- */}
            {/* <div>{dateTime.toLocaleString( 'en-EN', time )}</div> */}
            {/* <div>{gender}</div> */}

            <button type="button" onClick={onDetailsButtonClicked}> Deets</button>
            <br />
            {isInMyGamesArr( id, myGames )
                ? (
                    <RemoveGameButton
                        gameId={id}
                        rosterCount={rosterCount}
                        setRosterCount={setRosterCount}
                    />
                )
                : (
                    <AddPlayerButton
                        gameId={id}
                        setRosterCount={setRosterCount}
                        rosterCount={rosterCount}
                        setShowSignInModal={setShowSignInModal}
                    />
                )}

            {/* {player
            ? ''
            :
            } */}


            {showDetailsModal && <GameDetailsModal
                address1={address1}
                city={city}
                date={date}
                time={time}
                dateTime={dateTime}
                gender={gender}
                locationNote={locationNote}
                skillLevel={skillLevel}
                firstName={firstName}
                lastName={lastName}
                email={email}
                setShowDetailsModal={setShowDetailsModal} />}

            {showSignInModal && < MustSignInModal
                setShowSignInModal={setShowSignInModal} />}


        </div>
    )
}
