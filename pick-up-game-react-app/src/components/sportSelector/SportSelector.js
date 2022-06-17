import React from 'react'
import './SportSelector.css'
export default function SportSelector ( { sport, onSportSelected , round } ) {

    const SPORTS = [
        'basketball',
        'volleyball',
        'soccer',
        'football'
    ]


    return (
        <div className={`sport-groups ${round && 'round'}`}>
            {SPORTS.map( ( _sport, i ) => (
                <div key={i}
                className={`sport ${sport == _sport && `selected`}`}
                    onClick={() => {
                        if ( onSportSelected ) {
                            onSportSelected( _sport );
                        }
                    }}
                >
                    {_sport}
                </div>
            ) )}
        </div>

    )
}
