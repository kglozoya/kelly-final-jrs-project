import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import Login from './components/login&SignUp/Login';
import SignUp from './components/login&SignUp/SignUp';
import MyGamesLandingPage from './components/myGamesLanding/MyGamesLandingPage';
import UpcomingGamesLandingPage from './components/upcomingGamesLanding/UpcomingGamesLandingPage';
import CreateGameLandingPage from './components/createGameLanding/CreateGameLandingPage';
import GameDetailsModal from './components/modals/GameDetailsModal';
import Homepage from './components/homepage/Homepage';
import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from './services/localstorage.service';
import { useAxios } from './services/axios.service';
import { ToastProvider } from './components/toasts/ToastService';


export const MyGamesContext = createContext( null );


function App () {

  const localStorageService = useLocalStorage()
  const http = useAxios();

  const [ myGames, setMyGames ] = useState( [] )

  function updateMyGames () {
    getGamesByPlayerId()
  }
  function removeGame () {
    setMyGames( [] )
  }

  function addGameToMyGames ( game ) {
    setMyGames( [ ...myGames, game ] );
  }

  function getGamesByPlayerId () {

    var playerId = localStorageService.getPlayer()?.id;

    http.getGamesByPlayerId( playerId )
      .then( ( response ) => {
        setMyGames( response.data.games.map( g => {
          return {
            ...g,
            dateTime: new Date( g.dateTime )
          }
        } ) )
      } )
      .catch( ( err ) => {
        if ( err.response.status == 404 ) {
          setMyGames( [] )
        }
        console.log( err )
      } )
  }

  useEffect( () => {
    getGamesByPlayerId()
  }, [] )


  return (

    <MyGamesContext.Provider value={{ myGames, updateMyGames }}>
      <ToastProvider>

        <BrowserRouter>
          <div className='general-content'>
            <NavBar />
            <Routes>
              <Route path="/" element={<Homepage />}></Route>

              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>

              <Route path="/my-games" element={<MyGamesLandingPage />}></Route>

              <Route path="/upcoming-games" element={<UpcomingGamesLandingPage />}></Route>

              <Route path="/create-game" element={<CreateGameLandingPage />}></Route>

              <Route path="*" element={<div>404 - page does not exist</div>}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </ToastProvider>

    </MyGamesContext.Provider>
  );
}

export default App;
