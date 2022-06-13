import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './Footer.css'

export default function Footer () {
  return (
      <div className='footer-container'>

        <div className='logo-container'>
          <h1>Charleston <br />Pickup</h1>
        </div>

        <div className='author'>
          <h3>Created by:</h3>
          <a href="https://kglozoya.wixsite.com/website"><h1>Kelly Lozoya</h1></a>
        </div>
        <div className='icon-container'>
          <a href="mailto:kglozoya@gmail.com"><FontAwesomeIcon icon={faEnvelope} size="2x" /> </a>
          <a href="https://github.com/kglozoya"><FontAwesomeIcon icon={faGithub} size="2x" /> </a>
          <a href="https://www.linkedin.com/in/kellylozoya/"><FontAwesomeIcon icon={faLinkedin} size="2x" /> </a>
        </div>

      </div>
  )
}