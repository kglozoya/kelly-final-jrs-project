import React, { createContext, useEffect, useState } from 'react'
import UpcomingGamesList from './UpcomingGamesList'
import { useAxios } from '../../services/axios.service'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '../../services/localstorage.service';
import MustSignInModal from '../modals/MustSignInModal';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faVolleyball } from '@fortawesome/free-solid-svg-icons'
import circlePink from '../../assets/images/circle-logo-pink.png'
import './UpcomingGamesLandingPage.css'
import Loading from '../loading/Loading';
import SportSelector from '../sportSelector/SportSelector';

export const AllGamesContext = createContext( null );

export default function UpcomingGamesLandingPage () {

  const http = useAxios();
  const navigate = useNavigate();
  const { sport } = useParams();
  const localStorageService = useLocalStorage();
  var player = localStorageService.getPlayer()


  const [ games, setGames ] = useState( [] );
  const [ showSignInModal, setShowSignInModal ] = useState( false );
  const [ showLandingPageModal, setShowLandingPageModal ] = useState( false );
  const [ isLoading, setIsLoading ] = useState( true );


  function getAllGames () {
    http.getAllGames()
      .then( ( response => {

        setGames( response.data.games.map( g => {
          return {
            ...g,
            dateTime: new Date( g.dateTime )
          }
        } ) )
      } ) )
      .catch( ( err ) => { console.log( err ) } )
      .then( () => {
        setTimeout( () => {
          setIsLoading( false )
        }, 1500 )
      } )
  }

  function onAddGameClicked () {
    if ( player ) {
      navigate( `/create-game/${sport}` )
    } else {
      setShowSignInModal( true )
    }
  }

  useEffect( () => {
    getAllGames()
  }, [] );




  if ( isLoading ) {
    return (
      <Loading />
    )
  } else {

    return (
      <AllGamesContext.Provider value={{ getAllGames, games, setGames }}>

        <div className='upcoming-games-root'>
          <div className='text-card-container'>

            <SportSelector sport={sport}
              onSportSelected={( newSport ) => {
                navigate( `/sport/${newSport}` );
              }} />
            <br />
            <div className='text-container'>
              {/* <img src={circlePink} className='img' /> */}
              {sport
                ? <h1>{sport}</h1>
                : <div> <br /> <h1>Add a game!</h1> </div>
              }

            </div>

            <button onClick={onAddGameClicked} className='post-button'><FontAwesomeIcon icon={faArrowRight} /> POST NEW GAME </button>

            <UpcomingGamesList key={games.id} games={games} sport={sport} />

            {showSignInModal && <MustSignInModal
              setShowSignInModal={setShowSignInModal}
              setShowLandingPageModal={setShowLandingPageModal}
            />
            }


          </div>
        </div>
      </AllGamesContext.Provider>

    )
  }

}
