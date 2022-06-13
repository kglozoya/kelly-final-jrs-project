import React from 'react'
import CreateGameForm from './CreateGameForm'
import './CreateGameLandingPage.css'

export default function CreateGameLandingPage () {


  return (
    <div className='create-game-landing-root'>
      <h1> Add a new pick up game!</h1>
      <div className='form-container'>
        <CreateGameForm />
      </div>
    </div>
  )
}
