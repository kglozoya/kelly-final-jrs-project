import React, { useContext, useEffect, useState } from 'react'
import { useAxios } from '../../services/axios.service';
import AddPlayerButton from '../upcomingGamesLanding/AddPlayerButton'
import { Link, useParams, useNavigate } from "react-router-dom";
import './GameCard.css'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faLocationDot, faVolleyball, faUsers, faEllipsisVertical, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import GameDetailsModal from '../modals/GameDetailsModal';
import RemoveGameButton from '../myGamesLanding/RemoveGameButton';
import MyGamesLandingPage from '../myGamesLanding/MyGamesLandingPage';
import { MyGamesContext } from '../../App';
import MustSignInModal from '../modals/MustSignInModal';
import { useLocalStorage } from '../../services/localstorage.service';

export default function GameCard ( { id, sport, address1, city, dateTime, gender, skillLevel, rosterCount, locationNote, firstName, lastName, email, gameCreator } ) {

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
        <div className={`gamecard-root ${skillLevel == `all levels` ? `all-levels` : skillLevel}`}>

            <div onClick={onDetailsButtonClicked} className='details tooltip'>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>

            <div className='info'>
                <div>
                    <span className='icon'><FontAwesomeIcon icon={faChartSimple} /></span>
                    <span className='specifics'>{skillLevel}</span>
                </div>
                <div>
                    <span className='icon'><FontAwesomeIcon icon={faCalendarDay} /></span>
                    <span className='specifics'>{dateTime.toLocaleString( 'en-EN', date )}</span>
                </div>
                <div className='city'>
                    <span className='icon'><FontAwesomeIcon icon={faLocationDot} /></span>
                    <span className='specifics'>{city}</span>
                </div>
                <div>
                    <span className='icon'><FontAwesomeIcon icon={faUsers} /></span>
                    <span className='specifics'>{_rosterCount} attending</span>
                </div>


            </div>

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

            {showDetailsModal && <GameDetailsModal
                gameId={id}
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
                gameCreatorId={gameCreator}
                email={email}
                setShowDetailsModal={setShowDetailsModal} />}

            {showSignInModal && < MustSignInModal
                setShowSignInModal={setShowSignInModal} />}


        </div>
    )
}
