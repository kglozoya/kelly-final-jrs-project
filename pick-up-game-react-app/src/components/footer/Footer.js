import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './Footer.css'
import circleLogoOnly from '../../assets/images/circle-only.png'
import circleOnly from '../../assets/images/circle-only.png'
import { Link } from 'react-router-dom';


export default function Footer () {
  return (
    <div className='footer-container'>

      <div className='logo-container'>
        <Link to={"/"}>
          <img src={circleOnly} />
        </Link>

      </div>
      <div className='icon-container'>
        <a href="https://github.com/kglozoya"><FontAwesomeIcon icon={faGithub} size="2x" /> </a>
      </div>

    </div>
  )
}