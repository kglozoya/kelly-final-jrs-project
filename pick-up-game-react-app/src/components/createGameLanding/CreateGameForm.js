import React, { useEffect, useState } from 'react'
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import ToastMessenger, { useToasts } from '../toasts/ToastService';
import './CreateGameForm.css'

export default function CreateGameForm () {

  const localStorageService = useLocalStorage();
  const http = useAxios();
  const toast = useToasts();

  const SPORTS = [
    'volleyball',
    'soccer',
    'frisbee',
    'basketball',
    'cycling'
  ]

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
        toast.success( 'you did it!' )
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
      } )
      .catch( ( err ) => {
        console.log( err.response.data.message )
        alert( 'Error adding game. Please try again' )
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
      <div className='sport-groups'>
        {SPORTS.map( ( sport ) => (
          <div
            key={sport.id}
            className={`sport ${form.sport == sport && `selected`}`}
            onClick={() => {
              sportSelected( sport )
            }}
          >
            {sport}
          </div>
        ) )}
      </div>

      {/* DATE INPUT */}
      <label htmlFor='date'> Date:</label>
      <input
        id="date"
        type="date"
        name="date"
        value={form.date}
        min="2022-07-01"
        onChange={handleChange}
      // required
      />

      {/* TIME INPUT */}

      <label htmlFor='time'>Time:</label>
      <input
        id='time'
        type="time"
        name="time"
        value={form.time}
        step="300"
        onChange={handleChange} />

      {/* SKILL LEVEL INPUT */}
      <label htmlFor='skillLevel'>Skill level:</label>
      <select
        id="skillLevel"
        name="skillLevel"
        value={form.skillLevel}
        onChange={handleChange}
      >
        <option value='skill-level' selected hidden></option>
        <option value='beginner'>Beginner</option>
        <option value='intermediate'>Intermediate</option>
        <option value='advanced'>Advanced</option>
        <option value='all-levels'>All Skill Levels</option>
      </select>


      {/* GENDER INPUT */}
      <label htmlFor='gender'>Men/Women/Coed:</label>
      <select
        id='gender'
        name="gender"
        value={form.gender}
        onChange={handleChange}
      >
        <option value='gender' selected hidden></option>
        <option value='coed'>Coed</option>
        <option value='women'>Women</option>
        <option value='men'>Men</option>
      </select>

      {/* CITY INPUT */}

      <label htmlFor='city'>Location:</label>
      <select
        id="city"
        name="city"
        value={form.city}
        onChange={handleChange}
      >
        <option value='empty' selected hidden></option>
        <option value='downtown'>Downtown</option>
        <option value='mount-pleasant'>Mount Pleasant</option>
        <option value='north-charleston'>North Charleston</option>
        <option value='west-ashley'>West Ashley</option>
        <option value='folly-beach'>Folly Beach</option>
        <option value='sullivans-island'>Sullivan's Island</option>
        <option value='isle-of-palms'>Isle of Palms</option>
      </select>

      {/* ADDRESS INPUT */}

      <label htmlFor='address'>Street address: </label>
      <textarea
        id="address"
        name="address1"
        value={form.address1}
        onChange={handleChange}
        rows="1"
        columns="1"
        placeholder='123 Abc Street'
      >
      </textarea>

      {/* LOCATION INPUT */}

      <label htmlFor='location'>Location Details: </label>
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

      {/* SUBMIT */}

      <button type='submit'> Add Game!</button>
    </form>
  )
}
