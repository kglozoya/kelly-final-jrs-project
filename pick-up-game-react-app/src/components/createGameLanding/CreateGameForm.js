import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyGamesContext } from '../../App';
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import SportSelector from '../sportSelector/SportSelector';
import ToastMessenger, { useToasts } from '../toasts/ToastService';
import './CreateGameForm.css'

export default function CreateGameForm () {

  const localStorageService = useLocalStorage();
  const http = useAxios();
  const toast = useToasts();
  const navigate = useNavigate();
  const { getGamesByPlayerId } = useContext( MyGamesContext );

  const [ form, setForm ] = useState( {
    sport: 'volleyball',
    date: '',
    time: '',
    skillLevel: '',
    address1: '',
    city: '',
    locationNote: '',
    gender: ''
  } );

  var gameCreatorId = localStorageService.getPlayer()?.id

  function sportSelected ( sport ) {
    setForm( {
      ...form,
      sport
    } );
  }

  function handleChange ( e ) {
    const value = e.target.value;
    const name = e.target.name;
    setForm( {
      ...form,
      [ name ]: value
    } );
  }

  function updateForm () {
    var newTime = ( `${form.time}:00` )
    var dateTime = ( `${form.date}` + ` ` + `${form.time}:00` )
    form.dateTime = dateTime;
    form.gameCreator = gameCreatorId;
    form.city = ( `${form.city}`.replace( "-", " " ) )
    form.skillLevel = ( `${form.skillLevel}`.replace( "-", " " ) )
  }

  function postNewGame () {
    http.createNewGame( form )
      .then( ( results ) => {
        var newGameId = results.data.newGame.insertId
        addGameCreatorToGame( newGameId, gameCreatorId )
        getGamesByPlayerId()
        toast.success( 'New game created', 'You did it!' )
        setForm( {
          sport: 'volleyball',
          date: '',
          time: '',
          skillLevel: '',
          address1: '',
          city: '',
          locationNote: '',
          gender: ''
        } )
        navigate( `/sport/${form.sport}` )
      } )
      .catch( ( err ) => {
        console.log( err.response.data.message )
        toast.error( `Please fill in all required fields` )
      } )
  }


  function addGameCreatorToGame ( newGameId, gameCreator ) {
    http.addPlayerToGame( newGameId, gameCreator )
      .then( ( results ) => {
        console.log( results.data )
      } )
      .catch( ( err ) => { console.log( err ) } )
  }

  function handleSubmit ( e ) {
    e.preventDefault();
    updateForm()
    postNewGame()
  }




  return (
    <form
      className='new-game-form'
      onSubmit={handleSubmit}>

      {/* SPORT CHOICE INPUT */}
      <div className='form-section one'>
        <p>First, choose a sport</p>


        <SportSelector onSportSelected={sportSelected} sport={form.sport} round={true} />

      </div>

      <div className='form-section instructions'> Now, add the details</div>

      <div className="form-section grid-container">

        {/* DATE INPUT */}
        <div className="form-section r-one c-one">
          <label htmlFor='date' className='required'>Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={form.date}
            min="2022-07-01"
            onChange={handleChange}
          />
        </div>

        {/* TIME INPUT */}
        <div className='form-section r-one c-two'>
          <label htmlFor='time' className='required'>Time</label>
          <input
            id='time'
            type="time"
            name="time"
            value={form.time}
            step="300"
            onChange={handleChange}
          />

        </div>

        {/* SKILL LEVEL INPUT */}
        <div className='form-section r-two c-one'>

          <label htmlFor='skillLevel' className='required'>Skill level</label>
          <select
            id="skillLevel"
            name="skillLevel"
            value={form.skillLevel}
            onChange={handleChange}
          >
            <option value='' hidden></option>
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='advanced'>Advanced</option>
            <option value='all-levels'>All Skill Levels</option>
          </select>
        </div>

        {/* GENDER LEVEL INPUT */}
        <div className='form-section r-two c-two'>

          <label htmlFor='gender' className='required'>Men/Women/Coed</label>
          <select
            id='gender'
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value='' disabled hidden></option>
            <option value='coed'>Coed</option>
            <option value='women'>Women</option>
            <option value='men'>Men</option>
          </select>
        </div>

        {/* CITY INPUT */}
        <div className="form-section r-three c-one">
          <label htmlFor='city' className='required'>Location</label>
          <select
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
          >
            <option value='' hidden></option>
            <option value='downtown'>Downtown</option>
            <option value='mount-pleasant'>Mount Pleasant</option>
            <option value='north-charleston'>North Charleston</option>
            <option value='west-ashley'>West Ashley</option>
            <option value='folly-beach'>Folly Beach</option>
            <option value='sullivans-island'>Sullivan's Island</option>
            <option value='isle-of-palms'>Isle of Palms</option>
          </select>
        </div>

        {/* ADDRESS INPUT */}
        <div className='form-section r-three c-two'>
          <label htmlFor='address' className='required'>Street address</label>
          <input
            type="text"
            id="address"
            name="address1"
            value={form.address1}
            onChange={handleChange}
            rows="1"
            columns="1"
            placeholder='123 Abc Street'
          />
        </div>

      </div>

      {/* LOCATION INPUT */}
      <div className="form-section five">
        <label htmlFor='location'>Location Details</label>
        <textarea
          id="location"
          name="locationNote"
          value={form.locationNote}
          onChange={handleChange}
          rows="3"
          columns="1"
          placeholder='court to the right of the parking lot'
        >
        </textarea>
      </div>

      {/* SUBMIT */}
      <button type='submit' className='form-section button'> Create Game!</button>

    </form>
  )
}
