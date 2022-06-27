import { faBasketball, faFootball, faFutbol, faVolleyball } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useParams } from 'react-router-dom'
import './Loading.css'

export default function Loading ( { _sport } ) {

  const SPORTS = [
    {
      sport: 'basketball',
      icon: 'faBasketball'
    },
    {
      sport: 'volleyball',
      icon: 'faVolleyball'
    }, {
      sport: 'soccer',
      icon: 'faFutbol'
    }, {
      sport: 'football',
      icon: 'faFootball'
    },
  ]

  const { sport } = useParams();

  return (
    <div className='loading-container'>

      <div className='loading'>


        {_sport == "basketball" &&
          <div className='bounce'>
            <FontAwesomeIcon icon={faBasketball} className='spin basketball' />
          </div>
        }
        {sport == "basketball" &&
          <div className='bounce'>
            <FontAwesomeIcon icon={faBasketball} className='spin basketball' />
          </div>
        }
        {sport == "volleyball" &&
          <div className='travel'>
            <FontAwesomeIcon icon={faVolleyball} className='spin volleyball' />
          </div>
        }
        {sport == "soccer" &&
          <div className='travel'>
            <FontAwesomeIcon icon={faFutbol} className='spin futbol' />
          </div>
        }
        {sport == "football" &&
          <div className='diagonal'>
            <FontAwesomeIcon icon={faFootball} className='spin football' />
          </div>
        }
      </div>

    </div>
  )
}
